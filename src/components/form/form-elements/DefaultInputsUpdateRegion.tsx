"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "@/components/ui/button/Button";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";

export default function DefaultInputsUpdateRegion() {
  const router = useRouter();
  const params = useParams();
  const idParams = params?.id;

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchRegion = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`/regions/${idParams}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const region = res.data.data;
        setName(region.name);
      } catch (err) {
        console.error("Gagal fetch data user:", err);
      } finally {
        setLoading(false);
      }
    };
  
  // ===== Fetch data user untuk prefill =====
  useEffect(() => {
    if (idParams) fetchRegion();
  }, [idParams]);

  const handleUpdateRegion = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", name);
      await api.post(`/regions/${idParams}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/region?updated=1");
    } catch (error) {
      console.error("Error update user:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <ComponentCard title="Form Ubah Wilayah">
      <div className="space-y-6">
        <div>
          <Label>Nama</Label>
          <Input
            type="text"
            value={name}
            placeholder="nama wilayah"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="flex justify-center md:justify-end gap-x-3 ">
          <Button size="sm" variant="outline" onClick={() => router.push("/region")}>
            Kembali
          </Button>
          <Button size="sm" variant="primary" onClick={handleUpdateRegion} disabled={loading}>
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
              "Ubah Wilayah"
            )}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
