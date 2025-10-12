import Link from "next/link";
import Button from "../ui/button/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative bg-white px-32">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-10 mt-5 absolute top-0 left-0 w-full px-32">
        <div className="font-semibold tracking-widest 
        bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg absolute left-0 top-0 md:static ml-5 md:ml-0">
              <Image
                className="dark:hidden"
                src="/images/logo/portalumkm.png"
                alt="Logo"
                width={80}
                height={0}
              />
            </div>
        <Link href={"/signin"} className="absolute right-0 top-0 md:static mr-5 md:mr-5">
          <Button size="sm" variant="outline"
            className="shadow-lg px-6 py-2 rounded-xl font-semibold
            bg-gradient-to-br from-blue-700 to-indigo-900
            text-white hover:from-indigo-900 hover:to-blue-700
            transition-all duration-300"

          >
            Login
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-[460px] text-black order-2 md:order-1 text-center md:text-left">
          <h1 className="text-xl text-black font-semibold tracking-[5px] 2xl:text-3xl">PORTAL UMKM</h1>
          <h1 
            className="text-4xl font-bold 2xl:text-5xl 
            bg-gradient-to-br from-blue-700 to-indigo-900 
            bg-clip-text text-transparent 
            drop-shadow-lg"
          >
            PARUNG SERAB
          </h1>
          <p className="mt-5 text-lg 2xl:text-2xl text-gray-400 px-14 md:px-0">Selamat datang di portal resmi UMKM Kelurahan Parung Serab.
              Di sini kamu bisa menemukan informasi seputar berbagai usaha mikro, kecil, dan menengah beserta produk unggulannya.
              Kami juga menyediakan update mengenai event serta kegiatan terbaru yang berlangsung di Kelurahan Parung Serab.</p>
          <a href="#umkm">
          <Button size="sm" variant="outline" 
            className="mt-5 px-6 py-3 rounded-xl font-semibold shadow-lg 
            bg-gradient-to-br from-blue-700 to-indigo-900
            text-white hover:from-indigo-900 hover:to-blue-700
            transition-all duration-300"
          >
            Jelajahi UMKM
          </Button>
          </a>
        </div>

        <div className="order-1 md:order-2">
          <Image
            src="/images/illustration/market.png"
            alt="UMKM Produk"
            width={400}
            height={0}
            priority
          />
        </div>
      </div>
    </section>
  )
}