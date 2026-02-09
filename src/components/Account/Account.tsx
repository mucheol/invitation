import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '@/data/config'
import type { BankAccount } from '@/data/config'
import SectionTitle from '@/components/common/SectionTitle'
import CopyButton from '@/components/common/CopyButton'

export default function Account() {
  return (
    <section className="py-16 px-6 bg-white">
      <SectionTitle title="ACCOUNT" subtitle="마음 전하실 곳" />
      <div className="max-w-[360px] mx-auto space-y-3">
        <AccountAccordion title="신랑측 계좌" accounts={config.accounts.groom} />
        <AccountAccordion title="신부측 계좌" accounts={config.accounts.bride} />
      </div>
    </section>
  )
}

function AccountAccordion({
  title,
  accounts,
}: {
  title: string
  accounts: BankAccount[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gold/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex justify-between items-center text-sm font-medium text-charcoal bg-ivory/50 cursor-pointer"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-charcoal/40"
        >
          &#9662;
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4 bg-white">
              {accounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-charcoal/50">{account.bank}</p>
                    <p className="text-sm text-charcoal mt-0.5">{account.accountNumber}</p>
                    <p className="text-xs text-charcoal/60 mt-0.5">{account.holder}</p>
                  </div>
                  <CopyButton text={account.accountNumber} label="복사" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
