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
import Pagination from "./Pagination";

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

interface ApiResponse {
  data: Umkm[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
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
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchUmkms = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get<ApiResponse>(`/umkms?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setUmkms(responseData);
      setCurrentPage(res.data.current_page ?? 1);
      setTotalPages(res.data.last_page ?? 1);
    } catch (error) {
      console.error("Error fetching UMKM:", error);
      setUmkms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUmkms(currentPage);
  }, [currentPage]);

  const handleDeleteUmkm = async () => {
    if (!selectedId) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/umkms/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUmkms(currentPage);
      closeModal();
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting UMKM:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = ["Nama", "Alamat", "Aksi"];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              {/* Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : umkms.length > 0 ? (
                  umkms.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
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
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {u.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {u.description?.slice(0, 40)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {u.address}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => router.push(`/umkm/${u.id}`)}
                            className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                            title="Lihat Detail"
                          >
                            <EyeIcon size={16} />
                          </button>

                          <button
                            onClick={() =>
                              router.push(`/umkm/update-umkm/${u.id}`)
                            }
                            className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
                            title="Edit"
                          >
                            <PencilIcon size={16} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedId(u.id);
                              openModal();
                            }}
                            className="inline-flex items-center gap-1.5 text-error-500 hover:text-error-600 text-sm font-medium transition-colors"
                            title="Hapus"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-4 text-gray-500"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modal konfirmasi hapus */}
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
