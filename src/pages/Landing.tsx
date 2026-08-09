import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import TemplatesShowcase from '@/components/landing/TemplatesShowcase'
import Stats from '@/components/landing/Stats'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <TemplatesShowcase />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
