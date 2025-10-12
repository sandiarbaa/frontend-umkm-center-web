"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "../../../icons";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import FileInputExample from "./FileInputExample";
import Image from "next/image";

interface UserOption {
  value: number;
  label: string;
}

interface RegionOption {
  value: number;
  label: string;
}

export default function DefaultInputsUmkm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);

  // Fetch dropdown data
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = res.data.map((u: any) => ({
          value: u.id,
          label: u.name,
        }));
        setUserOptions(options);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const res = await api.get("/regions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = res.data.map((r: any) => ({
          value: r.id,
          label: r.name,
        }));
        setRegionOptions(options);
      } catch (error) {
        console.log("Error fetching regions:", error);
      }
    };

    fetchUsers();
    fetchRegions();
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!description.trim()) newErrors.description = "Deskripsi wajib diisi";
    if (!address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
    if (!userId) newErrors.userId = "User wajib dipilih";
    if (!regionId) newErrors.regionId = "Region wajib dipilih";
    if (!image) newErrors.image = "Gambar wajib diupload";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUmkm = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("user_id", String(userId));
      formData.append("region_id", String(regionId));
      if (image) formData.append("image", image);

      await api.post("/umkms", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/umkm?success=1");
    } catch (error) {
      console.log("Error adding UMKM:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Form Tambah UMKM">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <Label>Nama UMKM</Label>
          <Input
            type="text"
            placeholder="Masukkan nama UMKM"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <Label>Deskripsi</Label>
          <textarea
            className="w-full border rounded-md p-3 dark:bg-dark-900 dark:text-white"
            rows={4}
            placeholder="Masukkan deskripsi UMKM"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label>Alamat</Label>
          <Input
            type="text"
            placeholder="Masukkan alamat"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label>No Telepon</Label>
          <Input
            type="text"
            placeholder="081234567890"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* User Dropdown */}
        <div>
          <Label>Pilih Owner</Label>
          <div className="relative">
            <Select
              options={userOptions}
              placeholder="Pilih user"
              onChange={(val: string) => setUserId(Number(val))}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId}</p>}
        </div>

        {/* Region Dropdown */}
        <div>
          <Label>Pilih Wilayah</Label>
          <div className="relative">
            <Select
              options={regionOptions}
              placeholder="Pilih wilayah"
              onChange={(val: string) => setRegionId(Number(val))}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.regionId && (
            <p className="mt-1 text-sm text-red-500">{errors.regionId}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-start gap-x-10">
          <FileInputExample
            title="Gambar UMKM"
            setter={setImage}
            setPreview={setPreview}
            error={errors.image}
          />

          {preview && (
            <div className="mb-3 mt-5 md:mt-0 mx-auto">
              <Label className="text-center">Gambar Pratinjau</Label>
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

        {/* Buttons */}
        <div className="flex justify-center md:justify-end gap-x-3">
          <Button size="sm" variant="outline" onClick={() => router.push("/umkm")}>
            Kembali
          </Button>
          <Button size="sm" variant="primary" onClick={handleAddUmkm}>
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
              "Tambah UMKM"
            )}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
