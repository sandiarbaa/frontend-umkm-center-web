"use client";

import Button from "@/components/ui/button/Button";
// import ProductList from "@/components/ui/ProductList";
import UmkmList from "@/components/ui/UmkmList";
import Image from "next/image";
import Link from "next/link";

// import ProductList from '@/components/ui/ProductList';
// import UmkmList from '@/components/ui/UmkmList';

export default function WelcomePage() {
  return (
      <main className="">
        <div className="container mx-auto">
          {/* Header */}
          <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-br from-blue-700 to-blue-900 px-32">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-10 mt-5 absolute top-0 left-0 w-full px-32">
              <div className="text-white font-semibold">UMKM LOGO</div>
              <Link href={"/login"}>
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </Link>
            </div>

            {/* Hero */}
            <div className="flex justify-between items-center">
              <div className="w-[460px] text-white">
                <h1 className="text-xl text-white font-semibold tracking-widest 2xl:text-3xl">PORTAL UMKM</h1>
                <h1 className="text-4xl text-white font-bold 2xl:text-5xl">PARUNG SERAB</h1>
                <p className="mt-5 text-lg 2xl:text-2xl">Selamat datang di portal resmi UMKM Kelurahan Parung Serab.
                    Di sini kamu bisa menemukan informasi seputar berbagai usaha mikro, kecil, dan menengah beserta produk unggulannya.
                    Kami juga menyediakan update mengenai event serta kegiatan terbaru yang berlangsung di Kelurahan Parung Serab.</p>
                <Button size="sm" variant="outline" className="mt-5">
                  Jelajahi UMKM
                </Button>
              </div>

              <div>
                <Image
                  src="/images/illustration/market.png"
                  alt="UMKM Produk"
                  width={300}
                  height={0}
                  priority
                />
              </div>
            </div>
          </section>

          <section className="min-h-screen px-32 flex justify-center items-center py-10 bg-white">
            <div>
              <UmkmList />
            </div>
            {/* <ProductList/> */}
          </section>
        </div>
      </main>
  )
}