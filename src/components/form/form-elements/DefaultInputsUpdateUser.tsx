"use client";

import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

export default function DefaultInputsUpdateUser() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "admin", label: "Admin" },
    { value: "owner", label: "Owner" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Form Update User">
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input type="text" placeholder='yourname' />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="johndoe@gmail.com" />
        </div>

        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            className="dark:bg-dark-900"
          />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>

        <div className='flex justify-end gap-x-3'>
          <Button size="sm" variant="primary" onClick={() => router.push('/user')}>
            Back
          </Button>
          <Button size="sm" variant="primary">
            Update User
          </Button>
        </div>
        </div>
    </ComponentCard>
  );
}
