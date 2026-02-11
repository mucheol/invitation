import { useEffect, useRef } from 'react'
import config from '@/data/config'
import SectionTitle from '@/components/common/SectionTitle'
import CopyButton from '@/components/common/CopyButton'
import TransportInfo from './TransportInfo'

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void
        LatLng: new (lat: number, lng: number) => unknown
        Map: new (container: HTMLElement, options: Record<string, unknown>) => unknown
        Marker: new (options: Record<string, unknown>) => unknown
      }
    }
  }
}

export default function Location() {
  const { venue } = config
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    window.kakao.maps.load(() => {
      const position = new window.kakao.maps.LatLng(venue.lat, venue.lng)
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: position,
        level: 3,
      })
      new window.kakao.maps.Marker({ map, position })
    })
  }, [venue.lat, venue.lng])

  return (
    <section className="py-16 bg-ivory">
      <SectionTitle title="LOCATION" subtitle="오시는 길" />

      <div className="px-6 max-w-[400px] mx-auto">
        {/* Venue info */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-charcoal">{venue.name}</h3>
          <p className="text-sm text-charcoal/60 mt-1">{venue.hall}</p>
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <p className="text-sm text-charcoal/70">{venue.address}</p>
            <CopyButton text={venue.address} label="주소 복사" />
          </div>
          <a href={`tel:${venue.phone}`} className="text-sm text-gold mt-2 inline-block">
            {venue.phone}
          </a>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="w-full h-[280px] rounded-lg overflow-hidden shadow-md bg-warm-beige"
        />

        {/* Map app deep links */}
        <div className="flex justify-center gap-3 mt-4">
          <a
            href={`https://map.kakao.com/link/to/${venue.name},${venue.lat},${venue.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs bg-[#FEE500] text-[#3C1E1E] rounded-lg font-medium"
          >
            카카오맵
          </a>
          <a
            href={`https://map.naver.com/v5/directions/-/-/-/transit?c=${venue.lng},${venue.lat},16,0,0,0,dh&destination=${encodeURIComponent(venue.name)},${venue.lat},${venue.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs bg-[#03C75A] text-white rounded-lg font-medium"
          >
            네이버지도
          </a>
          <a
            href={`tmap://route?goalname=${encodeURIComponent(venue.name)}&goalx=${venue.lng}&goaly=${venue.lat}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs bg-[#3F51B5] text-white rounded-lg font-medium"
          >
            티맵
          </a>
        </div>

        <TransportInfo />
      </div>
    </section>
  )
}
