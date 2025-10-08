"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Button from "@/components/ui/button/Button";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";
import FileInputExample from "./FileInputExample";
import Image from "next/image";

export default function DefaultInputsUpdateUser() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(""); // preview foto lama
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const options = [
    { value: "admin", label: "Admin" },
    { value: "owner", label: "Owner" },
  ];

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Format email tidak valid";
    if (!role) newErrors.role = "Role wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.roles[0].name);
        if (user.image_url) setPreview(user.image_url);
      } catch (err) {
        console.error("Gagal fetch data user:", err);
      } finally {
        setLoading(false);
      }
    };
  
  // ===== Fetch data user untuk prefill =====
  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);

  const handleUpdateUser = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      if (password.trim()) formData.append("password", password);
      if (image) formData.append("image_path", image);

      await api.post(`/users/${userId}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/user?updated=1");
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
          Loading user data...
        </div>
      </div>
    );
  }

  return (
    <ComponentCard title="Form Update User">
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            placeholder="yourname"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            placeholder="youremail@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <Label>Password (kosongkan jika tidak diubah)</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label>Select Role</Label>
          <div className="relative">
            <Select
              options={options}
              placeholder="Select an option"
              onChange={handleSelectChange}
              value={role}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
        </div>

        <div className='flex flex-col items-center justify-center md:flex-row md:justify-start gap-x-10'>
          <FileInputExample
            title="Ganti Foto (opsional)"
            setter={setImage}
            setPreview={setPreview}
            error={errors.image}
          />
          
          {preview && (
            <div className="mb-3 mt-5 md:mt-0 mx-auto">
              <Label className='text-center'>Current Image</Label>
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

        <div className="flex justify-center md:justify-end gap-x-3 ">
          <Button size="sm" variant="primary" onClick={() => router.push("/user")}>
            Back
          </Button>
          <Button size="sm" variant="primary" onClick={handleUpdateUser}>
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
              "Update User"
            )}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
