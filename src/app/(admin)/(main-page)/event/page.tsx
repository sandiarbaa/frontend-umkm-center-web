"use client";

export const dynamic = "force-dynamic";

import EventTable from "@/components/tables/EventTable";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const updated = searchParams.get("updated");
  const [showAlert, setShowAlert] = useState<boolean>(!!success);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(!!updated);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  // alert add success
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

  // alert update success
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

  // alert delete success
  useEffect(() => {
    if (deleteSuccess) {
      const timer = setTimeout(() => setDeleteSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">Event Page</h1>

      <Button
        size="sm"
        variant="primary"
        onClick={() => router.push("/event/add-event")}
        className="my-5"
      >
        Add Event
      </Button>

      {showAlert && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Event berhasil ditambahkan."
        />
      )}

      {updateSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Event berhasil diubah."
        />
      )}

      {deleteSuccess && (
        <Alert
          variant="success"
          title="Berhasil!"
          message="Event berhasil dihapus."
        />
      )}

      <EventTable onDeleteSuccess={() => setDeleteSuccess(true)} />
    </div>
  );
}
