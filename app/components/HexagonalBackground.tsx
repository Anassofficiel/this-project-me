"use client"

const HexagonalBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      <div className="hexagon-pattern absolute inset-0"></div>
      {/* Semi-transparent overlay to improve content visibility */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
    </div>
  )
}

export default HexagonalBackground
