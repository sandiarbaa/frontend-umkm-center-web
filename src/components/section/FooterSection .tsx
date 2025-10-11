
export default function FooterSection() {
  return (
    <section className="min-h-16 px-32 flex flex-col md:flex-row gap-y-3 justify-between items-center py-10 bg-white">
      <div className="text-center md:text-start">
        <h2 className="tracking-widest text-sm">PORTAL UMKM</h2>
        <h1 className="tracking-tight font-semibold text-lg 
                      bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg">
          KELURAHAN PARUNG SERAB.
        </h1>
      </div>
      <div>
        <h2 className="tracking-widest text-sm text-black">
          Made with ❤️ Copyright &copy; 2025
        </h2>
      </div>
      <div>
            <h2 className="tracking-widest font-bold text-sm 
                      bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg">
          KELOMPOK 3 KEREN!
        </h2>
      </div>
    </section>
  )
}