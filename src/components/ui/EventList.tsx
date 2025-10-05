"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  places: string;
  image_path: string;
  event_date: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get<Event[]>("/events");
      setEvents(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-12 text-center bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg">
        Daftar Event
      </h2>

      {/* Grid Card */}
      <div className="space-y-6 grid grid-cols-2 gap-x-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 w-[500px]"
          >
            {/* Image */}
            <div className="md:w-1/3 w-full h-52 relative">
              <Image
                // src={event.image_path ? `/${event.image_path}` : "/images/cards/card-01.jpg"}
                src="/images/cards/card-02.jpg"
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
                <span className="font-semibold text-gray-700"></span> {event.places}
              </p>
              <p className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-gray-700"></span> {event.event_date}
              </p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
