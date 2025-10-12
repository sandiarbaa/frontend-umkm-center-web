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
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  places: string;
  event_date: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  created_at: string;
}

export default function EventTable({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async () => {
    if (!selectedId) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/events/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
      closeModal();
      onDeleteSuccess();
    } catch (error) {
      console.error("Gagal hapus event:", error);
    }
  };

  const columns = ["Judul", "Tempat", "Tanggal", "Aksi"];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
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

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {events.length > 0 ? (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 overflow-hidden rounded-lg">
                            <Image
                              width={48}
                              height={48}
                              src={
                                event.image_url || "/images/product/no-image.jpg"
                              }
                              alt={event.title}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block font-semibold text-gray-800 dark:text-white/90">
                              {event.title}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400 line-clamp-1 max-w-[300px]">
                              {event.description}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {event.places || "-"}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {event.event_date || "-"}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => router.push(`/event/${event.id}`)}
                            className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
                            title="Lihat Detail"
                          >
                            <EyeIcon size={16} />
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/event/update-event/${event.id}`)
                            }
                            className="inline-flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
                            title="Edit Event"
                          >
                            <PencilIcon size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedId(event.id);
                              openModal();
                            }}
                            className="inline-flex items-center text-error-500 hover:text-error-600 text-sm font-medium"
                            title="Hapus Event"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal konfirmasi delete */}
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
          <Button size="sm" variant="danger" onClick={handleDeleteEvent}>
            Hapus
          </Button>
        </div>
      </Modal>
    </>
  );
}
