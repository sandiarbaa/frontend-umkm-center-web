"use client";

import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';

export default function DefaultInputsRegion() {
  const router = useRouter()
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key:string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Name
    if (!name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddRegion = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);

      await api.post("/regions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // reset state
      setName("");

      router.push("/region?success=1");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Form Tambah Wilayah">
      <div className="space-y-6">
        <div>
          <Label>Nama</Label>
          <Input type="text" placeholder='nama wilayah' onChange={(e) => setName(e.target.value)} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className='flex justify-center md:justify-end gap-x-3'>
          <Button size="sm" variant="outline" onClick={() => router.push('/region')}>
            Kembali
          </Button>
          <Button size="sm" variant="primary" onClick={handleAddRegion}>
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
              "Tambah Wilayah"
            )}
          </Button>
        </div>
        </div>
    </ComponentCard>
  );
}
