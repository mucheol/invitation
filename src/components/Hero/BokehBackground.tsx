import { useMemo } from 'react'

interface BokehCircle {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  opacity: number
}

export default function BokehBackground() {
  const circles: BokehCircle[] = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 140 + 30,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    }))
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f5e6d3, #f0d5c4, #e8c4c4, #f5e6d3, #dfc99b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      {/* Floating bokeh circles */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            background: `radial-gradient(circle, rgba(201,169,110,${circle.opacity}) 0%, transparent 70%)`,
            animation: `bokehFloat ${circle.duration}s ease-in-out ${circle.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Sparkle particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 5}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bokehFloat {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          33% { transform: translate(20px, -25px) scale(1.1); opacity: 0.8; }
          66% { transform: translate(-15px, 20px) scale(0.9); opacity: 1; }
          100% { transform: translate(10px, -15px) scale(1.05); opacity: 0.9; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
