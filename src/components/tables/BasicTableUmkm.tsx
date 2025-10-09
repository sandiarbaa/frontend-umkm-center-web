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
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";

interface Umkm {
  id: number;
  user_id: number;
  name: string;
  description: string;
  image_url?: string;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function BasicTableUmkm({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [umkms, setUmkms] = useState<Umkm[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchUmkms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/umkms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUmkms(res.data);
    } catch (error) {
      console.error("Error fetching UMKM:", error);
    }
  };

  useEffect(() => {
    fetchUmkms();
  }, []);

  const handleDeleteUmkm = async () => {
    if (!selectedId) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/umkms/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUmkms();
      closeModal();
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting UMKM:", error);
    }
  };

  const columns = ["Nama", "Alamat", "Status", "Aksi"];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader className="border-b border-gray-100">
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100">
                {umkms.length > 0 ? (
                  umkms.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={u.image_url || "/images/umkm/default.jpg"}
                              alt={u.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800">
                              {u.name}
                            </span>
                            <span className="block text-gray-500 text-sm">
                              {u.description?.slice(0, 30)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start">
                        {u.address}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start capitalize">
                        {u.status}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => router.push(`/umkm/${u.id}`)}
                            className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600"
                          >
                            <EyeIcon size={16} />
                          </button>

                          <button
                            onClick={() => router.push(`/umkm/update-umkm/${u.id}`)}
                            className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600"
                          >
                            <PencilIcon size={16} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedId(u.id);
                              openModal();
                            }}
                            className="inline-flex items-center gap-1.5 text-error-500 hover:text-error-600"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-4 py-3 text-gray-500">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal konfirmasi hapus */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] p-5">
        <h4 className="font-semibold text-gray-800 mb-4 text-title-sm">
          Konfirmasi Hapus
        </h4>
        <p className="text-md leading-6 text-gray-500">
          Apakah kamu yakin ingin menghapus data UMKM ini?
        </p>
        <div className="flex items-center justify-end gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Batal
          </Button>
          <Button size="sm" variant="danger" onClick={handleDeleteUmkm}>
            Hapus
          </Button>
        </div>
      </Modal>
    </>
  );
}
