"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import api from "../../../../../../lib/api";

interface EventDetail {
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

export default function ShowDetailEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent(res.data.data);
    } catch (error) {
      console.error("Gagal fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Loading data...</div>
    );

  if (!event)
    return (
      <div className="text-center py-20 text-gray-500">
        Data event tidak ditemukan.
      </div>
    );

  return (
    <ComponentCard title={`Detail Acara`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Image
            src={event.image_url || "/images/product/no-image.jpg"}
            alt="Event Image"
            width={300}
            height={300}
            className="rounded-2xl border border-gray-200 shadow-sm"
          />
        </div>
        <div className="space-y-4 w-[500px]">
          <div>
            <Label>Judul Acara</Label>
            <p className="font-semibold mt-1">{event.title}</p>
          </div>

          <div>
            <Label>Deskripsi</Label>
            <p className="text-gray-700 mt-1 whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div>
            <Label>Tempat</Label>
            <p className="font-semibold mt-1">{event.places || "-"}</p>
          </div>

          <div>
            <Label>Tanggal Acara</Label>
            <p className="font-semibold mt-1">{event.event_date || "-"}</p>
          </div>

          <div className="flex gap-5">
            <div>
              <Label>Mulai</Label>
              <p className="font-semibold mt-1">{event.start_date || "-"}</p>
            </div>
            <div>
              <Label>Selesai</Label>
              <p className="font-semibold mt-1">{event.end_date || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push("/event")}
          className="rounded-full px-5 py-2"
        >
          Back
        </Button>
      </div>
    </ComponentCard>
  );
}
