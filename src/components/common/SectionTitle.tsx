import type { ReactNode } from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: ReactNode
}

export default function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <div className="text-center mb-8">
      {icon && <div className="text-gold text-2xl mb-2">{icon}</div>}
      <h2 className="text-xl font-medium text-charcoal tracking-widest">{title}</h2>
      {subtitle && <p className="text-sm text-charcoal/60 mt-1">{subtitle}</p>}
      <div className="w-8 h-px bg-gold mx-auto mt-4" />
    </div>
  )
}
