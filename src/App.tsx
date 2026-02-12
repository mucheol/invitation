import { MusicProvider } from '@/hooks/useMusic'
import Hero from '@/components/Hero/Hero'
import MusicToggle from '@/components/Hero/MusicToggle'
import Greeting from '@/components/Greeting/Greeting'
import Gallery from '@/components/Gallery/Gallery'
import Calendar from '@/components/Calendar/Calendar'
import Location from '@/components/Location/Location'
import Account from '@/components/Account/Account'
import GuestBook from '@/components/GuestBook/GuestBook'
import Share from '@/components/Share/Share'
import Footer from '@/components/Footer/Footer'
import ScrollReveal from '@/components/common/ScrollReveal'

function App() {
  return (
    <MusicProvider>
      <div className="min-h-screen bg-ivory font-serif max-w-screen-sm mx-auto relative overflow-hidden shadow-2xl">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-charcoal">
          본문으로 건너뛰기
        </a>
        <MusicToggle />
        <Hero />
        <main id="main-content">
          <ScrollReveal><Greeting /></ScrollReveal>
          <ScrollReveal><Gallery /></ScrollReveal>
          <ScrollReveal><Calendar /></ScrollReveal>
          <ScrollReveal><Location /></ScrollReveal>
          <ScrollReveal><Account /></ScrollReveal>
          <ScrollReveal><GuestBook /></ScrollReveal>
          <ScrollReveal><Share /></ScrollReveal>
        </main>
        <Footer />
      </div>
    </MusicProvider>
  )
}

export default App
