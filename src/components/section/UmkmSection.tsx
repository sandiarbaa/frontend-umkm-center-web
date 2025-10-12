import UmkmList from "../ui/UmkmList";

export default function UmkmSection() {
  return (
    <section id="umkm" className="min-h-screen px-32 flex justify-center items-center py-10 bg-white">
      <div>
        <UmkmList />
      </div>
    </section>
  )
}