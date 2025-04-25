"use client"

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Semi-transparent overlay to improve content visibility */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Rain background with green colors */}
      <div className="container-green absolute inset-0 opacity-60"></div>

      {/* Hole animation with green colors */}
      <div className="hole-green absolute inset-0 z-0 opacity-40">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <i key={i}></i>
          ))}
      </div>
    </div>
  )
}

export default AnimatedBackground
