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
    const loadMap = () => {
      if (!mapRef.current || !window.kakao?.maps) return

      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(venue.lat, venue.lng)
        const map = new window.kakao.maps.Map(mapRef.current!, {
          center: position,
          level: 3,
        })
        new window.kakao.maps.Marker({ map, position })
      })
    }

    // Check if Kakao Maps SDK is loaded
    if (window.kakao?.maps) {
      loadMap()
    } else {
      // If SDK hasn't loaded yet, wait for it
      const script = document.createElement('script')
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.kakao.jsKey}&autoload=false`
      script.onload = loadMap
      document.head.appendChild(script)
    }
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
            href={`nmap://route/public?dlat=${venue.lat}&dlng=${venue.lng}&dname=${encodeURIComponent(venue.name)}&appname=wedding`}
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
