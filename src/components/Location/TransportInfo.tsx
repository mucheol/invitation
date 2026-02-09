import config from '@/data/config'

export default function TransportInfo() {
  const { transport } = config.venue

  const items = [
    {
      label: '지하철',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      lines: transport.subway,
    },
    {
      label: '버스',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      ),
      lines: transport.bus,
    },
    {
      label: '자가용',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
        </svg>
      ),
      lines: [transport.car],
    },
    {
      label: '주차',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z" />
        </svg>
      ),
      lines: [transport.parking],
    },
  ]

  return (
    <div className="mt-8 space-y-4">
      {items.map(({ icon, label, lines }) => (
        <div key={label} className="flex gap-3 text-sm">
          <span className="mt-0.5 shrink-0">{icon}</span>
          <div>
            <p className="font-medium text-charcoal">{label}</p>
            {lines.map((line, i) => (
              <p key={i} className="text-charcoal/60 text-xs mt-0.5">{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
