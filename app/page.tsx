"use client"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import LicenseOptionsSection from "./components/LicenseOptionsSection"
import AboutSection from "./components/AboutSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import HexagonalBackground from "./components/HexagonalBackground"

export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
      <HexagonalBackground />
      <div className="relative z-30">
        <Header />
        <main className="container mx-auto px-4">
          <HeroSection />
          <LicenseOptionsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
