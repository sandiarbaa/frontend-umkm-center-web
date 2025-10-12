"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import api from "../../../../../../lib/api";

interface RegionDetail {
  id: number;
  name: string;
}

export default function ShowDetailRegionPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [region, setRegion] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRegion = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/regions/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegion(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchRegion();
  }, [userId]);

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

  if (!region) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Data region tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <ComponentCard title={`Detail Wilayah`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-start md:gap-8 lg:gap-12">
        {/* Informasi User */}
        <div className="flex-col mt-6 md:mt-0 space-y-5 w-[500px]">
          <div>
            <Label>Nama</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {region.name}
            </p>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex justify-end mt-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push("/region")}
          className="rounded-full px-5 py-2"
        >
          Kembali
        </Button>
      </div>
    </ComponentCard>
  );
}
