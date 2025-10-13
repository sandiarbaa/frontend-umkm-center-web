"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Pagination from "../tables/Pagination";

interface Umkm {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  image_url: string;
}

interface ApiResponse {
  data: Umkm[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function UmkmList() {
  const [umkms, setUmkms] = useState<Umkm[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUmkms = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get<ApiResponse>(`/public/umkms?page=${page}`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setUmkms(data);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error: ", error);
      setUmkms([])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUmkms(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-16 text-center
      bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg">Daftar UMKM</h2>

      {/* Grid Card */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {umkms.length > 0 ? umkms.map((umkm) => (
          <Link
            href={`/welcome/umkm/${umkm.id}`}
            key={umkm.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5 border border-gray-100 flex flex-col min-w-80"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {umkm.name}
            </h3>

            {/* Image */}
            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                // src="/images/cards/card-01.jpg"
                src={umkm.image_url ? `${umkm.image_url}` : "/images/cards/card-01.jpg"}
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
          </Link>
        )) : (
          <p className="text-center col-span-3 text-gray-500">Tidak ada UMKM tersedia.</p>
        )}
      </div>
      )}
      

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
