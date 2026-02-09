import { createContext, useContext, useRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import config from '@/data/config'

interface MusicContextType {
  isPlaying: boolean
  toggle: () => void
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  toggle: () => {},
})

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(config.music.src)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    if (config.music.autoPlay) {
      const playAttempt = audio.play()
      if (playAttempt) {
        playAttempt
          .then(() => setIsPlaying(true))
          .catch(() => {
            const playOnInteraction = () => {
              audio.play().then(() => setIsPlaying(true)).catch(() => {})
              document.removeEventListener('click', playOnInteraction)
              document.removeEventListener('touchstart', playOnInteraction)
            }
            document.addEventListener('click', playOnInteraction)
            document.addEventListener('touchstart', playOnInteraction)
          })
      }
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggle }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
