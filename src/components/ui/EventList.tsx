"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import Pagination from "../tables/Pagination";

interface Event {
  id: number;
  title: string;
  description: string;
  places: string;
  image_url: string;
  event_date: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: Event[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEvents = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get<ApiResponse>(`/public/events?page=${page}`);
      const eventData = Array.isArray(res.data.data) ? res.data.data : [];
      setEvents(eventData);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-8">
      <h2
        className="text-2xl font-bold mb-12 text-center bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg"
      >
        Daftar Acara
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <div className="flex flex-col min-w-80 space-y-6 md:grid md:grid-cols-2 gap-x-10">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 md:w-[300px] lg:w-[500px]"
              >
                {/* Image */}
                <div className="md:w-1/3 w-full h-52 relative">
                  <Image
                    src={
                      event.image_url
                        ? `${event.image_url}`
                        : "/images/cards/card-01.jpg"
                    }
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {event.description}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-2">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-gray-700">
                        {event.places}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-gray-700">
                        {event.event_date}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              Tidak ada Acara tersedia.
            </p>
          )}
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
