"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import api from "../../../../../../lib/api";

interface UserDetail {
  id: number;
  name: string;
  email: string;
  image_url?: string;
  roles?: { name: string }[];
}

export default function ShowDetailUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUser();
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

  if (!user) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Data user tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <ComponentCard title={`Detail User`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-start md:gap-8 lg:gap-12">
        {/* Foto Profil */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          {/* <div className="relative w-48 h-48"> */}
          <div>
            <Image
              src={user.image_url || "/images/user/user-22.jpg"}
              alt="User Profile"
              width={300}
              height={300}
              className="object-cover rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Informasi User */}
        <div className="flex-col mt-6 md:mt-0 space-y-5 w-[500px]">
          <div>
            <Label>Nama</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {user.name}
            </p>
          </div>

          <div>
            <Label>Email</Label>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {user.email}
            </p>
          </div>

          <div>
            <Label>Role</Label>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                user.roles?.[0]?.name === "admin"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              }`}
            >
              {user.roles?.[0]?.name ?? "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex justify-end mt-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push("/user")}
          className="rounded-full px-5 py-2"
        >
          Back
        </Button>
      </div>
    </ComponentCard>
  );
}
