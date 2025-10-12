"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import api from "../../../../../../lib/api";

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  umkm_id: number;
  umkm_name?: string;
}

export default function ShowDetailProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;

      // fetch umkm name by umkm_id
      const umkmRes = await api.get(`/umkms/${data.umkm_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // setProduct({ ...data, umkm_name: umkmRes.data.data.name });
      setProduct({ ...data, umkm_name: umkmRes.data.data.name });
    } catch (error) {
      console.error("Gagal fetch produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading data...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Data produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <ComponentCard title="Detail Produk">
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <Image
            src={product.image_url ? product.image_url : "/images/user/user-22.jpg"}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-2xl border shadow-sm object-cover"
          />
        </div>

        <div className="space-y-5 w-[500px]">
          <div>
            <Label>Nama Produk</Label>
            <p className="text-lg font-semibold mt-1">{product.name}</p>
          </div>
          <div>
            <Label>Deskripsi</Label>
            <p className="text-gray-700 mt-1 whitespace-pre-line">
              {product.description || "-"}
            </p>
          </div>
          <div>
            <Label>Harga</Label>
            <p className="font-semibold text-gray-800 mt-1">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0, // biar gak ada ,00 di belakang
              }).format(product.price)}
            </p>
          </div>
          <div>
            <Label>UMKM</Label>
            <p className="font-semibold text-gray-800 mt-1">
              {product.umkm_name || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push("/product")}
          className="rounded-full px-5 py-2"
        >
          Kembali
        </Button>
      </div>
    </ComponentCard>
  );
}
