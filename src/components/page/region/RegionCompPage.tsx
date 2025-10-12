"use client"

import RegionTable from "@/components/tables/RegionTable";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegionCompPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const updated = searchParams.get("updated");
  const [showAlert, setShowAlert] = useState<boolean>(!!success);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(!!updated); // 🔹 state baru
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

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
      <h1>Daftar Wilayah</h1>

      <Button size="sm" variant="primary" onClick={() => router.push('/region/add-region')} className="my-5">
        Tambah Wilayah
      </Button>

      {showAlert && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Region berhasil ditambahkan."
        />
      )}

      {updateSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Region berhasil diubah."
        />
      )}

      {deleteSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Region berhasil dihapus."
        />
      )}

      <RegionTable onDeleteSuccess={() => setDeleteSuccess(true)}/>
    </div>
  )
}