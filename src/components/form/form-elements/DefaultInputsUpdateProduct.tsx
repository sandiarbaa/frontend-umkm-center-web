"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Select from "../Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "../../../icons";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";
import FileInputExample from "./FileInputExample";
import Image from "next/image";

export default function DefaultInputsUpdateProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [umkmId, setUmkmId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [umkmOptions, setUmkmOptions] = useState<{ value: string; label: string }[]>([]);

  // ===== FETCH LIST UMKM =====
  const fetchUmkms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/umkms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('umkm: ',res.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = res.data.map((u: any) => ({
        value: u.id.toString(),
        label: u.name,
      }));
      setUmkmOptions(options);
    } catch (error) {
      console.error("Gagal fetch UMKM:", error);
    }
  };

  // ===== FETCH DATA PRODUK UNTUK PREFILL =====
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product = res.data.data;
      console.log('produk: ',res.data);
      setUmkmId(product.umkm_id.toString());
      setName(product.name);
      setDescription(product.description || "");
      setPrice(product.price?.toString() || "");
      if (product.image_url) setPreview(product.image_url || "");
    } catch (error) {
      console.error("Gagal fetch produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUmkms();
    if (productId) fetchProduct();
  }, [productId]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ===== VALIDASI =====
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!umkmId) newErrors.umkm_id = "UMKM wajib dipilih";
    if (!name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!price.trim()) newErrors.price = "Harga wajib diisi";
    if (!description.trim()) newErrors.description = "Deskripsi wajib diisi";
    else if (isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Harga harus berupa angka positif";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== HANDLE UPDATE PRODUK =====
  const handleUpdateProduct = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("umkm_id", umkmId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);

      await api.post(`/products/${productId}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/product?updated=1");
    } catch (error) {
      console.error("Gagal update produk:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            className="animate-spin h-5 w-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading data...
        </div>
      </div>
    );
  }

  // ===== UI =====
  return (
    <ComponentCard title="Form Update Product">
      <div className="space-y-6">
        {/* UMKM */}
        <div>
          <Label>UMKM</Label>
          <div className="relative">
            <Select
              options={umkmOptions}
              placeholder="Pilih UMKM"
              value={umkmId}
              onChange={(value) => setUmkmId(value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.umkm_id && <p className="mt-1 text-sm text-red-500">{errors.umkm_id}</p>}
        </div>

        {/* Nama Produk */}
        <div>
          <Label>Nama Produk</Label>
          <Input
            type="text"
            value={name}
            placeholder="Masukkan nama produk"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Deskripsi Produk */}
        <div>
          <Label>Deskripsi</Label>
          <TextArea
            placeholder="Masukkan deskripsi produk (opsional)"
            value={description}
            onChange={(val) => setDescription(val)}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Harga */}
        <div>
          <Label>Harga</Label>
          <Input
            type="text"
            value={price ? `Rp ${Number(price).toLocaleString("id-ID")}` : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setPrice(raw ? raw : "");
            }}
            placeholder="Masukkan harga produk"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-start gap-x-10">
          <FileInputExample
            title="Ganti Gambar (opsional)"
            setter={setImage}
            setPreview={setPreview}
            error={errors.image}
          />

          {preview && (
            <div className="mb-3 mt-5 md:mt-0 mx-auto">
              <Label className="text-center">Current Image</Label>
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={300}
                className="object-cover rounded-lg border mx-auto"
              />
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-center md:justify-end gap-x-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => router.push("/product")}>
            Back
          </Button>
          <Button size="sm" variant="primary" onClick={handleUpdateProduct}>
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
