import { useState } from 'react'
import { motion } from 'framer-motion'

interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 z-[60] text-white/80 text-3xl w-10 h-10 flex items-center justify-center hover:text-white cursor-pointer"
      >
        &times;
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white/60 text-sm" aria-live="polite">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="이전 사진"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-[60] text-white/60 text-4xl hover:text-white cursor-pointer p-2"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="다음 사진"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-[60] text-white/60 text-4xl hover:text-white cursor-pointer p-2"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Image */}
      <div className="w-full h-full flex items-center justify-center p-8" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`웨딩 사진 ${currentIndex + 1}번`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </motion.div>
  )
}
