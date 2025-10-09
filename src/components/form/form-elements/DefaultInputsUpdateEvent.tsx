"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "@/components/ui/button/Button";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";
import FileInputExample from "./FileInputExample";
import Image from "next/image";
import TextArea from "../input/TextArea";
import DatePicker from "../date-picker";

export default function DefaultInputsUpdateEvent() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [places, setPlaces] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ===== VALIDASI =====
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = "Judul event wajib diisi";
    if (!description.trim()) newErrors.description = "Deskripsi event wajib diisi";
    if (!places.trim()) newErrors.places = "Tempat event wajib diisi";
    if (!eventDate.trim()) newErrors.event_date = "Tanggal event wajib diisi";
    if (!startDate.trim()) newErrors.start_date = "Tanggal mulai wajib diisi";
    if (!endDate.trim()) newErrors.end_date = "Tanggal selesai wajib diisi";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const event = new Date(eventDate);

    if (start > end)
      newErrors.date_range = "Tanggal mulai tidak boleh setelah tanggal selesai";
    if (event < start || event > end)
      newErrors.event_date = "Tanggal event harus di antara tanggal mulai dan selesai";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== FETCH EVENT EXISTING DATA =====
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const event = res.data.data;
      setTitle(event.title);
      setDescription(event.description);
      setPlaces(event.places);
      setEventDate(event.event_date);
      setStartDate(event.start_date);
      setEndDate(event.end_date);
      if (event.image_url) setPreview(event.image_url);
    } catch (error) {
      console.error("Gagal fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId]);

  // ===== HANDLE UPDATE =====
  const handleUpdateEvent = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("places", places);
      formData.append("event_date", eventDate);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);

      if (image) formData.append("image", image);

      await api.post(`/events/${eventId}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/event?updated=1");
    } catch (error) {
      console.error("Gagal update event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !title) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            className="animate-spin h-5 w-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading data...
        </div>
      </div>
    );
  }

  // ===== UI =====
  return (
    <ComponentCard title="Form Update Event">
      <div className="space-y-6">
        {/* Judul */}
        <div>
          <Label>Judul Event</Label>
          <Input
            type="text"
            placeholder="Masukkan judul event"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Deskripsi */}
        <div>
          <Label>Deskripsi</Label>
          <TextArea
            placeholder="Masukkan deskripsi event"
            value={description}
            onChange={(val) => setDescription(val)}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Lokasi */}
        <div>
          <Label>Tempat</Label>
          <Input
            type="text"
            placeholder="Lokasi event"
            value={places}
            onChange={(e) => setPlaces(e.target.value)}
          />
          {errors.places && <p className="mt-1 text-sm text-red-500">{errors.places}</p>}
        </div>

        {/* Tanggal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <DatePicker
              id="event-date"
              label="Tanggal Event"
              placeholder="Pilih tanggal event"
              defaultDate={eventDate}
              onChange={(dates, currentDateString) => setEventDate(currentDateString)}
            />
            {errors.event_date && <p className="mt-1 text-sm text-red-500">{errors.event_date}</p>}
            {errors.date_range && <p className="mt-1 text-sm text-red-500">{errors.date_range}</p>}
          </div>

          <div>
            <DatePicker
              id="start-date"
              label="Tanggal Mulai"
              placeholder="Pilih tanggal mulai"
              defaultDate={startDate}
              onChange={(dates, currentDateString) => setStartDate(currentDateString)}
            />
            {errors.start_date && <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>}
          </div>

          <div>
            <DatePicker
              id="end-date"
              label="Tanggal Selesai"
              placeholder="Pilih tanggal selesai"
              defaultDate={endDate}
              onChange={(dates, currentDateString) => setEndDate(currentDateString)}
            />
            {errors.end_date && <p className="mt-1 text-sm text-red-500">{errors.end_date}</p>}
          </div>
        </div>

        {/* Gambar */}
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-start gap-x-10">
          <FileInputExample
            title="Ganti Gambar (opsional)"
            setter={setImage}
            setPreview={setPreview}
            error={errors.image}
          />

          {preview && (
            <div className="mb-3 mt-5 md:mt-0 mx-auto">
              <Label className="text-center">Current Image</Label>
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={300}
                className="object-cover rounded-lg border mx-auto"
              />
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-center md:justify-end gap-x-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => router.push("/event")}>
            Back
          </Button>
          <Button size="sm" variant="primary" onClick={handleUpdateEvent}>
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Update Event"
            )}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
