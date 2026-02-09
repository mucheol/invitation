import config from '@/data/config'
import SectionTitle from '@/components/common/SectionTitle'
import DDay from './DDay'

export default function Calendar() {
  const weddingDate = new Date(config.wedding.date)
  const year = weddingDate.getFullYear()
  const month = weddingDate.getMonth()
  const day = weddingDate.getDate()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <section className="py-16 px-6 bg-white">
      <SectionTitle title="WEDDING DAY" />

      <div className="max-w-[320px] mx-auto">
        <p className="text-center text-lg font-medium text-charcoal mb-6">
          {year}년 {month + 1}월
        </p>

        {/* Day name headers */}
        <div className="grid grid-cols-7 text-center text-xs mb-2">
          {dayNames.map((name, i) => (
            <span
              key={i}
              className={`py-1 font-medium ${
                i === 0 ? 'text-deep-rose' : i === 6 ? 'text-blue-400' : 'text-charcoal/50'
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 text-center text-sm">
          {cells.map((d, i) => {
            const isWeddingDay = d === day
            const isSunday = i % 7 === 0
            const isSaturday = i % 7 === 6

            return (
              <div key={i} className="py-1.5 relative flex items-center justify-center">
                {d !== null && (
                  <span
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors
                      ${isWeddingDay ? 'bg-deep-rose text-white font-bold shadow-md' : ''}
                      ${!isWeddingDay && isSunday ? 'text-deep-rose/60' : ''}
                      ${!isWeddingDay && isSaturday ? 'text-blue-400/60' : ''}
                      ${!isWeddingDay && !isSunday && !isSaturday ? 'text-charcoal/70' : ''}
                    `}
                  >
                    {d}
                  </span>
                )}
                {isWeddingDay && (
                  <span className="absolute -bottom-0.5 text-[8px] text-deep-rose">&#9829;</span>
                )}
              </div>
            )
          })}
        </div>

        <DDay />
      </div>
    </section>
  )
}
