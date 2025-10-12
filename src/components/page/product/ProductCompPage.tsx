"use client";

import BasicTableProduct from "@/components/tables/BasicTableProduct";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductCompPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const updated = searchParams.get("updated");

  const [showAlert, setShowAlert] = useState(!!success);
  const [updateSuccess, setUpdateSuccess] = useState(!!updated);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("success");
        router.replace(url.pathname);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  useEffect(() => {
    if (updated) {
      const timer = setTimeout(() => {
        setUpdateSuccess(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("updated");
        router.replace(url.pathname);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updated, router]);

  useEffect(() => {
    if (deleteSuccess) {
      const timer = setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 dark:text-white">Daftar Produk</h1>

      <Button
        size="sm"
        variant="primary"
        onClick={() => router.push("/product/add-product")}
        className="my-5"
      >
        Tambah Produk
      </Button>

      {showAlert && (
        <Alert variant="success" title="Berhasil!" message="Produk berhasil ditambahkan." />
      )}
      {updateSuccess && (
        <Alert variant="success" title="Berhasil!" message="Produk berhasil diperbarui." />
      )}
      {deleteSuccess && (
        <Alert variant="success" title="Berhasil!" message="Produk berhasil dihapus." />
      )}

      <BasicTableProduct onDeleteSuccess={() => setDeleteSuccess(true)} />
    </div>
  );
}
