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
    <section className="py-16 bg-ivory" aria-label="갤러리">
      <SectionTitle title="GALLERY" subtitle="우리의 기록" />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={images.length > 1}
        className="w-full max-w-[340px] mx-auto rounded-lg overflow-hidden shadow-lg"
        style={{ aspectRatio: '3/4' }}
        a11y={{
          prevSlideMessage: '이전 사진',
          nextSlideMessage: '다음 사진',
          paginationBulletMessage: '사진 {{index}}번으로 이동',
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => setLightboxIndex(index)}
              className="w-full h-full border-0 p-0 cursor-pointer"
              aria-label={`웨딩 사진 ${index + 1}번 크게 보기`}
            >
              <img
                src={src}
                alt={`웨딩 사진 ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-1.5 mt-4 px-6 max-w-[340px] mx-auto" role="list" aria-label="사진 썸네일">
        {images.slice(0, 8).map((src, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="border-0 p-0 cursor-pointer rounded overflow-hidden"
            role="listitem"
            aria-label={`사진 ${index + 1}번 크게 보기`}
          >
            <img
              src={src}
              alt=""
              className="w-full aspect-square object-cover opacity-70 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </button>
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
