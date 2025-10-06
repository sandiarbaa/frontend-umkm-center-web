"use client";

import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';

export default function DefaultInputs() {
  const router = useRouter()
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key:string]: string }>({})

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
    if (!email) newErrors.email = "Email wajib dipilih";
    if (!password) newErrors.password = "password wajib diisi | min:6 Huruf";
    if (!role) newErrors.role = "Role wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddUser = async () => {
    if(!validate()) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      await api.post('/users', {
        name,
        email,
        password,
        role
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // reset state
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      
      router.push("/user?success=1");
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <ComponentCard title="Form Add User">
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input type="text" placeholder='yourname' onChange={(e) => setName(e.target.value)} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            className="dark:bg-dark-900"
          />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role}</p>
          )}
        </div>

        <div className='flex justify-end gap-x-3'>
          <Button size="sm" variant="primary" onClick={() => router.push('/user')}>
            Back
          </Button>
          <Button size="sm" variant="primary" onClick={handleAddUser}>
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
              "Add User"
            )}
          </Button>
        </div>
        </div>
    </ComponentCard>
  );
}
