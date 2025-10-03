"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Image from "next/image";

interface Umkm {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
}

export default function UmkmList() {
  const [umkms, setUmkms] = useState<Umkm[]>([]);

  const fetchUmkms = async () => {
    try {
      const res = await api.get<Umkm[]>("/umkms");
      setUmkms(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchUmkms();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-16 text-gray-800 text-center">Daftar UMKM</h2>

      {/* Grid Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {umkms.map((umkm) => (
          <div
            key={umkm.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5 border border-gray-100 flex flex-col"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {umkm.name}
            </h3>

            {/* Image */}
            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/cards/card-01.jpg"
                alt="UMKM Produk"
                width={300}
                height={0}
                priority
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {umkm.description}
            </p>

            {/* Info */}
            <div className="text-sm text-gray-500 mt-auto">
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Alamat:</span>{" "}
                {umkm.address}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Telp:</span>{" "}
                {umkm.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
