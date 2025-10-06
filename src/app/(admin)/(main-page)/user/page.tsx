"use client"

import BasicTableOne from "@/components/tables/BasicTableOne";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const success = searchParams.get("success");   // untuk tambah
  const updated = searchParams.get("updated");   // 🔹 untuk ubah
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
      <h1>User Page</h1>

      <Button size="sm" variant="primary" onClick={() => router.push('/user/add-user')} className="my-5">
        Add User
      </Button>

      {showAlert && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="User berhasil ditambahkan."
        />
      )}

      {updateSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="User berhasil diubah."
        />
      )}

      {deleteSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="User berhasil dihapus."
        />
      )}

      <BasicTableOne onDeleteSuccess={() => setDeleteSuccess(true)}/>
    </div>
  )
}