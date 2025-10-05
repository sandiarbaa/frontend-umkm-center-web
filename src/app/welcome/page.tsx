"use client";

import EventSection from "@/components/section/EventSection";
import FooterSection from "@/components/section/FooterSection ";
import HeroSection from "@/components/section/HeroSection";
import UmkmSection from "@/components/section/UmkmSection";

export default function WelcomePage() {
  return (
      <main className="">
        <div className="container mx-auto">
          <HeroSection />

          <div className="px-32 bg-white">
            <hr className="border-b-2" />
          </div>
          
          <UmkmSection />
          
          <div className="px-32 bg-white">
            <hr className="border-b-2" />
          </div>
          
          <EventSection />

          <hr className="border-b" />
          
          <FooterSection />
        </div>
      </main>
  )
}