import { useMusic } from '@/hooks/useMusic'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicToggle() {
  const { isPlaying, toggle } = useMusic()

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80
                 backdrop-blur-sm shadow-md flex items-center justify-center
                 text-gold transition-colors hover:bg-gold hover:text-white cursor-pointer"
      aria-label={isPlaying ? '음악 끄기' : '음악 켜기'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.svg
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="muted"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" opacity="0.3" />
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
