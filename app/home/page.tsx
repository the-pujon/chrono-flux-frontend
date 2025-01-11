'use client'

import CTA from "@/components/home/CTA"
import FAQ from "@/components/home/FAQ"
import Features from "@/components/home/Features"
import Footer from "@/components/home/Footer"
import GetStarted from "@/components/home/GetStarted"
import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import HowItWorks from "@/components/home/HowItWorks"
import Testimonials from "@/components/home/Testimonials"


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <GetStarted />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

