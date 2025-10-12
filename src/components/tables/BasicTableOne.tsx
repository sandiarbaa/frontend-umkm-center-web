"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import api from "../../../lib/api";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
// import Image from "next/image";

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  roles : Role[];
}

export default function BasicTableOne({ onDeleteSuccess }: { onDeleteSuccess: () => void }) {
  const router = useRouter()
  const { isOpen, openModal, closeModal } = useModal();
  const [users, setUsers] = useState<User[] | []>([])
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(res.data)
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])
  
  const columns = ['Nama', 'Email', 'Aksi'];
  
  const handleDeleteUser = async () => {
    if (!selectedId) return;
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/users/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchUsers();
      closeModal();
      onDeleteSuccess();
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.length > 0 ? (
                  users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={user.image_url ? user.image_url : '/images/user/user-22.jpg'}
                              alt={user.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {user.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {user.roles[0].name}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.email}
                      </TableCell>
                      {/* Action */}

                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => router.push(`/user/${user.id}`)}
                            className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                            title="Lihat Detail"
                          >
                            <EyeIcon size={16} />
                          </button>
                          
                          <button
                            onClick={() => router.push(`/user/update-user/${user.id}`)}
                            className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
                          >
                            <PencilIcon size={16} />
                          </button>

                          <button
                            className="inline-flex items-center gap-1.5 text-error-500 hover:text-error-600 text-sm font-medium transition-colors"
                            onClick={() => {
                            setSelectedId(user.id);
                            openModal();
                          }}
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Delete */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[500px] p-5 lg:p-8"
      >
        <h4 className="font-semibold text-gray-800 mb-4 text-title-sm dark:text-white/90">
          Konfirmasi Hapus
        </h4>
        <p className="text-md leading-6 text-gray-500 dark:text-gray-400">
          Apakah kamu yakin ingin menghapus data ini?
        </p>
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Batal
          </Button>
          <Button size="sm" variant="danger" onClick={handleDeleteUser}>
            Hapus
          </Button>
        </div>
      </Modal>
    </>
  );
}
