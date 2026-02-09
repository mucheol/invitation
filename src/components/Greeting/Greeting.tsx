import config from '@/data/config'
import SectionTitle from '@/components/common/SectionTitle'

export default function Greeting() {
  const { groom, bride, meta } = config

  return (
    <section className="py-16 px-6 bg-white">
      <SectionTitle title={meta.greetingTitle} />

      <p className="text-center text-sm leading-8 text-charcoal/80 whitespace-pre-line mt-6">
        {meta.greetingMessage}
      </p>

      {/* Parents and couple names */}
      <div className="mt-10 text-center text-sm text-charcoal/70 space-y-3">
        <p>
          <span className="text-charcoal/50">{groom.fatherName} &#183; {groom.motherName}</span>
          <span className="text-charcoal/40">의 {groom.relation} </span>
          <span className="text-charcoal font-medium text-base">{groom.name}</span>
        </p>
        <p>
          <span className="text-charcoal/50">{bride.fatherName} &#183; {bride.motherName}</span>
          <span className="text-charcoal/40">의 {bride.relation} </span>
          <span className="text-charcoal font-medium text-base">{bride.name}</span>
        </p>
      </div>

      {/* Contact buttons */}
      <div className="flex justify-center gap-8 mt-10">
        <a href={`tel:${groom.phone}`} className="flex flex-col items-center text-xs text-charcoal/60 gap-2">
          <span className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold text-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </span>
          신랑에게 연락
        </a>
        <a href={`tel:${bride.phone}`} className="flex flex-col items-center text-xs text-charcoal/60 gap-2">
          <span className="w-12 h-12 rounded-full bg-deep-rose/10 flex items-center justify-center text-deep-rose text-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </span>
          신부에게 연락
        </a>
      </div>
    </section>
  )
}
