"use client";

import BasicTableUmkm from "@/components/tables/BasicTableUmkm";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UmkmCompPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const updated = searchParams.get("updated");
  const [showAlert, setShowAlert] = useState<boolean>(!!success);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(!!updated);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  // Alert ketika tambah data
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

  // Alert ketika update data
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

  // Alert ketika delete
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
      <h1 className="text-xl font-semibold dark:text-white">Daftar UMKM</h1>

      <Button
        size="sm"
        variant="primary"
        onClick={() => router.push("/umkm/add-umkm")}
        className="my-5"
      >
        Add UMKM
      </Button>

      {showAlert && (
        <Alert variant="success" title="Berhasil!" message="UMKM berhasil ditambahkan." />
      )}

      {updateSuccess && (
        <Alert variant="success" title="Berhasil!" message="UMKM berhasil diubah." />
      )}

      {deleteSuccess && (
        <Alert variant="success" title="Berhasil!" message="UMKM berhasil dihapus." />
      )}

      <BasicTableUmkm onDeleteSuccess={() => setDeleteSuccess(true)} />
    </div>
  );
}
