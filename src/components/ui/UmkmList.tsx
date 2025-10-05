"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

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
      <h2 className="text-2xl font-bold mb-16 text-center
      bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg">Daftar UMKM</h2>

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
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 mt-2">
              {umkm.description}
            </p>

            {/* Info */}
            <div className="text-sm text-gray-500 mt-auto">
              <p className="mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {umkm.address}
              </p>
              <p className="mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-gray-700"></span>{"   "}
                {umkm.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
