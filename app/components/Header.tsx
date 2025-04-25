"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tighter text-shadow">
          drannel
        </Link>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </Button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-black/80 backdrop-blur-md md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors text-shadow-sm">
                Beats
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-green-400 transition-colors text-shadow-sm">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-green-400 transition-colors text-shadow-sm">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button asChild className="hidden md:block pro-button">
          <a href="https://drqnnel.beatstars.com" target="_blank" rel="noopener noreferrer">
            Buy Different Music
          </a>
        </Button>
      </div>
    </header>
  )
}
