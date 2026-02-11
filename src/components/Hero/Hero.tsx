import { motion } from 'framer-motion'
import BokehBackground from './BokehBackground'
import config from '@/data/config'

export default function Hero() {
  const { groom, bride, wedding, venue } = config

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-end">
      {/* Layer 1: Animated background */}
      <BokehBackground />

      {/* Layer 2: Cutout image of bride & groom */}
      <div className="absolute bottom-80 left-1/2 -translate-x-1/2 w-100 h-100 rounded-full overflow-hidden z-10 pointer-events-none select-none border-2 border-gold/30">
        <img
          src="/images/gallery/mainBg.png"
          alt={`${groom.name} & ${bride.name}`}
          className="w-full h-full object-cover object-[center_30%]"
          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
        />
      </div>

      {/* Layer 3: Text overlay */}
      <div className="relative z-20 text-center pb-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs text-charcoal/60 tracking-[0.4em] mb-4 uppercase"
        >
          Wedding Invitation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl font-semibold text-charcoal"
        >
          {groom.name}
          <span className="text-gold mx-3 text-2xl">&#9829;</span>
          {bride.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-4 space-y-1"
        >
          <p className="text-sm text-charcoal/60 tracking-wider">
            {wedding.date.replace(/-/g, '.')} {wedding.timeDetail}
          </p>
          <p className="text-sm text-charcoal/60 tracking-wider">
            {venue.name} {venue.hall}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gold/40 text-3xl"
          >
            &#8964;
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
