import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/data/firebase'
import SectionTitle from '@/components/common/SectionTitle'

interface RSVPForm {
  name: string
  attendance: 'yes' | 'no' | 'maybe'
  guestCount: number
  meal: 'yes' | 'no'
  side: 'groom' | 'bride'
}

export default function RSVP() {
  const [form, setForm] = useState<RSVPForm>({
    name: '',
    attendance: 'yes',
    guestCount: 1,
    meal: 'yes',
    side: 'groom',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'rsvp'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch {
      alert('전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-16 px-6 bg-ivory">
        <SectionTitle title="RSVP" subtitle="참석 여부" />
        <p className="text-center text-sm text-charcoal/70">
          참석 여부가 전달되었습니다. 감사합니다! &#9829;
        </p>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 bg-ivory">
      <SectionTitle title="RSVP" subtitle="참석 여부" />

      <form onSubmit={handleSubmit} className="max-w-[340px] mx-auto space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="성함"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg text-sm
                     placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
          required
        />

        {/* Side selection */}
        <div className="flex gap-2">
          {(['groom', 'bride'] as const).map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => setForm({ ...form, side })}
              className={`flex-1 py-2.5 rounded-lg text-sm border transition-colors cursor-pointer
                ${form.side === side
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white text-charcoal/60 border-gold/20'}`}
            >
              {side === 'groom' ? '신랑측' : '신부측'}
            </button>
          ))}
        </div>

        {/* Attendance */}
        <div className="flex gap-2">
          {([
            { value: 'yes' as const, label: '참석' },
            { value: 'no' as const, label: '불참' },
            { value: 'maybe' as const, label: '미정' },
          ]).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm({ ...form, attendance: value })}
              className={`flex-1 py-2.5 rounded-lg text-sm border transition-colors cursor-pointer
                ${form.attendance === value
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white text-charcoal/60 border-gold/20'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Guest count */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-charcoal/60">동반 인원</span>
          <div className="flex items-center border border-gold/20 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setForm({ ...form, guestCount: Math.max(1, form.guestCount - 1) })}
              className="px-3 py-2 text-charcoal/40 hover:text-charcoal cursor-pointer"
            >
              -
            </button>
            <span className="px-4 text-sm tabular-nums">{form.guestCount}</span>
            <button
              type="button"
              onClick={() => setForm({ ...form, guestCount: Math.min(10, form.guestCount + 1) })}
              className="px-3 py-2 text-charcoal/40 hover:text-charcoal cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-xs text-charcoal/40">명</span>
        </div>

        {/* Meal */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-charcoal/60 shrink-0">식사 여부</span>
          <div className="flex gap-2 flex-1">
            {([
              { value: 'yes' as const, label: '예정' },
              { value: 'no' as const, label: '안 함' },
            ]).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, meal: value })}
                className={`flex-1 py-2 rounded-lg text-sm border transition-colors cursor-pointer
                  ${form.meal === value
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white text-charcoal/60 border-gold/20'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold text-white rounded-lg text-sm font-medium
                     hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? '전송 중...' : '참석 여부 전달하기'}
        </button>
      </form>
    </section>
  )
}
