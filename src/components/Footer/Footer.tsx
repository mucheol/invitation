import config from '@/data/config'

export default function Footer() {
  return (
    <footer className="py-14 px-6 bg-warm-beige text-center">
      <p className="text-lg text-charcoal font-medium">{config.meta.closingMessage}</p>
      <p className="text-sm text-charcoal/50 mt-4">
        {config.groom.name} &amp; {config.bride.name}
      </p>
      <div className="w-12 h-px bg-gold/30 mx-auto my-6" />
      <p className="text-[10px] text-charcoal/30">
        Made with &#9829;
      </p>
    </footer>
  )
}
