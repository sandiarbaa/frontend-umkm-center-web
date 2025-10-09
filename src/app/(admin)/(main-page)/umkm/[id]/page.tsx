"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import api from "../../../../../../lib/api";

interface UmkmDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  image_url?: string;
  user_id?: number;
  region_id?: number;
}

interface UserDetail {
  id: number;
  name: string;
  email: string;
}

interface RegionDetail {
  id: number;
  name: string;
}

export default function ShowDetailUmkmPage() {
  const router = useRouter();
  const params = useParams();
  const umkmId = params?.id;

  const [umkm, setUmkm] = useState<UmkmDetail | null>(null);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [region, setRegion] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // --- FETCH UMKM ---
  const fetchUmkm = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/umkms/${umkmId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      setUmkm(data);

      // setelah umkm berhasil diambil, fetch user dan region
      if (data.user_id) fetchUser(data.user_id);
      if (data.region_id) fetchRegion(data.region_id);
    } catch (error) {
      console.error("Gagal mengambil data UMKM:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH USER ---
  const fetchUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Gagal mengambil data User:", error);
    }
  };

  // --- FETCH REGION ---
  const fetchRegion = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/regions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegion(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data Region:", error);
    }
  };

  useEffect(() => {
    if (umkmId) fetchUmkm();
  }, [umkmId]);

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

  if (!umkm) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Data UMKM tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <ComponentCard title={`Detail UMKM`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-start md:gap-8 lg:gap-12">
        {/* Foto UMKM */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div>
            <Image
              src={umkm.image_url || "/images/product/no-image.jpg"}
              alt="UMKM Image"
              width={300}
              height={300}
              className="object-cover rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Informasi UMKM */}
        <div className="flex-col mt-6 md:mt-0 space-y-5 w-[500px]">
          <div>
            <Label>Nama UMKM</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {umkm.name}
            </p>
          </div>

          <div>
            <Label>Deskripsi</Label>
            <p className="text-base text-gray-700 dark:text-gray-200 mt-1 whitespace-pre-line">
              {umkm.description}
            </p>
          </div>

          <div>
            <Label>Alamat</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {umkm.address}
            </p>
          </div>

          <div>
            <Label>No Telepon</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {umkm.phone}
            </p>
          </div>

          <div>
            <Label>Region</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {region?.name ?? "-"}
            </p>
          </div>

          <div>
            <Label>User Pemilik</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {user?.name ?? "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex justify-end mt-10">
        <Button
          size="sm"
          variant="primary"
          onClick={() => router.push("/umkm")}
          className="rounded-full px-5 py-2"
        >
          Back
        </Button>
      </div>
    </ComponentCard>
  );
}
