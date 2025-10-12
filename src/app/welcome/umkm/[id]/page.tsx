"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../../../lib/api";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/button/Button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_path: string;
}

interface Umkm {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  image_url: string;
  products: Product[];
}

interface ApiResponse {
  message: string;
  data: Umkm;
}

export default function DetailUmkm() {
  const router = useRouter();
  const params = useParams();
  const umkmId = params?.id;

  const [umkm, setUmkm] = useState<Umkm | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUmkm = async () => {
    try {
      const res = await api.get<ApiResponse>(`/public/umkms/${umkmId}`);
      setUmkm(res.data.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (umkmId) fetchUmkm();
  }, [umkmId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Memuat data UMKM...</p>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Data UMKM tidak ditemukan.</p>
      </div>
    );
  }

  return (
  <div className="container mx-auto px-4 py-10">
    {/* HERO DETAIL UMKM */}
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-lg p-1">
      <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        {/* IMAGE */}
        <div className="md:w-1/3 flex justify-center">
          <div className="relative w-full max-w-sm h-64 rounded-xl overflow-hidden">
            <Image
              src={umkm.image_url}
              alt={umkm.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{umkm.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-5">{umkm.description}</p>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>{umkm.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span>{umkm.phone}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push("/welcome")}
            className="rounded-full px-5 py-2 w-20"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>

    {/* PRODUCTS */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        Produk Unggulan dari {umkm.name}
      </h2>

      {umkm.products && umkm.products.length > 0 ? (
        <div className="flex flex-col justify-center items-center md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkm.products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col min-w-80"
            >
              {/* Gambar Produk */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={`https://um.cen.medialoger.com/storage/${product.image_path}`}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Konten */}
              <div className="flex flex-col flex-grow p-5">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-indigo-700 font-bold text-sm">
                    Rp {parseInt(product.price).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          Belum ada produk yang terdaftar.
        </p>
      )}
    </div>
  </div>
);

}
