"use client";

import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Button from "@/components/ui/button/Button";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";

export default function DefaultInputsUpdateUser() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const options = [
    { value: "admin", label: "Admin" },
    { value: "owner", label: "Owner" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data;

        setName(user.name);
        setEmail(user.email);
        setRole(user.roles[0].name);
      } catch (error) {
        console.error("Gagal fetch data user:", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // 🔍 Validasi form
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!email.trim()) newErrors.email = "Email wajib diisi";
    if (!role) newErrors.role = "Role wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Update user
  const handleUpdateUser = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.put(
        `/users/${userId}`,
        {
          name,
          email,
          password: password || undefined, // biar password gak wajib diubah
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/user?updated=1");
    } catch (error) {
      console.error("Error update user:", error);
      alert("Gagal memperbarui user");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  return (
    <ComponentCard title="Form Update User">
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="yourname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label>Password (optional)</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Isi jika ingin mengganti password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
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
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
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
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role}</p>
          )}
        </div>

        <div className="flex justify-end gap-x-3">
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
                Updating...
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
