"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import api from "../../../lib/api";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url?: string;
  umkm_id: number;
}

export default function BasicTableProduct({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data);
    } catch (error) {
      console.error("Gagal fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      closeModal();
      onDeleteSuccess();
    } catch (error) {
      console.error("Gagal hapus produk:", error);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["Nama", "Harga", "Action"].map((col) => (
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

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {products.length > 0 ? (
                  products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <Image
                              src={p.image_url ? p.image_url : "/images/user/user-22.jpg"}
                              alt={p.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {p.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(p.price)}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => router.push(`/product/${p.id}`)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <EyeIcon size={16} />
                          </button>
                          <button
                            onClick={() => router.push(`/product/update-product/${p.id}`)}
                            className="text-primary-500 hover:text-primary-600"
                          >
                            <PencilIcon size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedId(p.id);
                              openModal();
                            }}
                            className="text-error-500 hover:text-error-600"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-5 py-4 text-gray-500">No Data.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] p-5 lg:p-8">
        <h4 className="font-semibold text-gray-800 mb-4 text-title-sm dark:text-white/90">
          Konfirmasi Hapus
        </h4>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Apakah kamu yakin ingin menghapus produk ini?
        </p>
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Batal
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </div>
      </Modal>
    </>
  );
}
