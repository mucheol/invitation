import { useState, useEffect } from 'react'
import config from '@/data/config'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft | null {
  const now = new Date()
  const diff = config.wedding.dDay.getTime() - now.getTime()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function DDay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return (
      <p className="text-center mt-8 text-base text-deep-rose font-medium">
        오늘 결혼합니다! &#9829;
      </p>
    )
  }

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ]

  return (
    <div className="mt-10 text-center">
      <p className="text-xs text-charcoal/50 mb-3 tracking-wider">결혼식까지</p>
      <div className="flex justify-center gap-4">
        {items.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-2xl font-semibold text-charcoal tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-charcoal/40 tracking-wider mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
