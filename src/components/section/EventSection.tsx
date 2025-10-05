import EventList from "../ui/EventList";

export default function EventSection() {
  return (
    <section className="min-h-screen px-32 flex justify-center items-center py-10 bg-white">
      <div>
        <EventList />
      </div>
    </section>
  )
}