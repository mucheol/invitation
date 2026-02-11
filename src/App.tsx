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
        <MusicToggle />
        <Hero />
        <ScrollReveal><Greeting /></ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal><Calendar /></ScrollReveal>
        <ScrollReveal><Location /></ScrollReveal>
        <ScrollReveal><Account /></ScrollReveal>
        <ScrollReveal><GuestBook /></ScrollReveal>
        <ScrollReveal><Share /></ScrollReveal>
        <Footer />
      </div>
    </MusicProvider>
  )
}

export default App
