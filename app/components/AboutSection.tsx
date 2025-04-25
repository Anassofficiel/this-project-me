"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Headphones, Music, Mic2, Award, ExternalLink } from "lucide-react"
import Link from "next/link"

const achievements = [
  { icon: <Headphones className="w-6 h-6" />, label: "Years of Experience", value: "10+" },
  { icon: <Music className="w-6 h-6" />, label: "Tracks Produced", value: "500+" },
  { icon: <Mic2 className="w-6 h-6" />, label: "Artists Collaborated", value: "100+" },
  { icon: <Award className="w-6 h-6" />, label: "Awards Won", value: "15+" },
]

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="grid md:grid-cols-2 gap-12 items-center" style={{ y, opacity }}>
          <div className="relative">
            {/* Decorative elements to make the image stand out but still fit the design */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-white/5 rounded-3xl transform -rotate-6 scale-105"></div>
            <div className="absolute inset-0 border-2 border-green-500/20 rounded-3xl transform rotate-3 scale-95"></div>

            {/* The image container with special effects */}
            <div className="relative z-10 overflow-hidden rounded-3xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500"></div>

              <Image
                src="/images/music-collage.png"
                alt="Music production elements"
                width={600}
                height={400}
                className="rounded-3xl relative z-0 transform transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectFit: "contain",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              />

              {/* Subtle animation effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-20"></div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About drannel</h2>
            <p className="text-lg mb-6 text-zinc-300">
              drannel is not just a beat maker; he's a sonic architect crafting the soundscapes of tomorrow. With a
              decade of experience and an ear for innovation, drannel pushes the boundaries of what's possible in music
              production.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              From chart-topping hits to underground anthems, drannel's versatile style and meticulous attention to
              detail ensure that each beat is not just a track, but a journey waiting to be explored by the right
              artist.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="bg-zinc-900/50 rounded-lg p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">{achievement.icon}</div>
                    <div className="text-2xl font-bold">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Website link */}
            <motion.div className="mt-8 inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}>
              <Link
                href="https://exemple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pro-button inline-flex items-center px-6 py-3 rounded-lg"
              >
                Visit Our Website <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
