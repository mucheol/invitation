import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionTitle from '@/components/common/SectionTitle'
import Lightbox from './Lightbox'
import config from '@/data/config'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { images } = config.gallery

  if (images.length === 0) return null

  return (
    <section className="py-16 bg-ivory">
      <SectionTitle title="GALLERY" subtitle="우리의 기록" />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={images.length > 1}
        className="w-full max-w-[340px] mx-auto rounded-lg overflow-hidden shadow-lg"
        style={{ aspectRatio: '3/4' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`웨딩 사진 ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setLightboxIndex(index)}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-1.5 mt-4 px-6 max-w-[340px] mx-auto">
        {images.slice(0, 8).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`썸네일 ${index + 1}`}
            className="w-full aspect-square object-cover rounded cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => setLightboxIndex(index)}
            loading="lazy"
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
