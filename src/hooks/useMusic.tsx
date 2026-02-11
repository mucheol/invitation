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
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = config.music.src
    audio.loop = true
    audio.volume = 0.1
    audio.preload = 'auto'
    audioRef.current = audio

    const tryPlay = () => {
      if (hasPlayedRef.current) return
      audio.play()
        .then(() => {
          hasPlayedRef.current = true
          setIsPlaying(true)
          removeListeners()
        })
        .catch(() => {})
    }

    const events = ['click', 'touchstart', 'scroll', 'keydown'] as const
    const removeListeners = () => {
      events.forEach(evt => document.removeEventListener(evt, tryPlay))
    }

    if (config.music.autoPlay) {
      // 먼저 자동 재생 시도
      tryPlay()
      // 실패 대비: 사용자 인터랙션 시 재생
      events.forEach(evt =>
        document.addEventListener(evt, tryPlay, { once: false, passive: true })
      )
    }

    return () => {
      removeListeners()
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
