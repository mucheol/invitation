import { useState, useEffect } from 'react'
import {
  collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/data/firebase'
import SectionTitle from '@/components/common/SectionTitle'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  name: string
  message: string
  createdAt: Timestamp | null
}

export default function GuestBook() {
  const [messages, setMessages] = useState<Message[]>([])
  const [form, setForm] = useState({ name: '', password: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'), limit(50))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]
      setMessages(msgs)
    }, () => {
      // Firebase not configured - silently ignore
    })
    return unsubscribe
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: form.name,
        password: form.password,
        message: form.message,
        createdAt: serverTimestamp(),
      })
      setForm({ name: '', password: '', message: '' })
    } catch {
      alert('메시지 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 px-6 bg-white">
      <SectionTitle title="GUEST BOOK" subtitle="축하 메시지" />

      {/* Message form */}
      <form onSubmit={handleSubmit} className="max-w-[340px] mx-auto space-y-3 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 px-3 py-2.5 bg-ivory border border-gold/20 rounded-lg text-sm
                       placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-24 px-3 py-2.5 bg-ivory border border-gold/20 rounded-lg text-sm
                       placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50"
            required
          />
        </div>
        <textarea
          placeholder="축하 메시지를 남겨주세요"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 bg-ivory border border-gold/20 rounded-lg text-sm
                     placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 resize-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gold text-white rounded-lg text-sm font-medium
                     hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? '작성 중...' : '축하 메시지 남기기'}
        </button>
      </form>

      {/* Message list */}
      {messages.length > 0 && (
        <div className="max-w-[340px] mx-auto space-y-3 max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-ivory rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-charcoal">{msg.name}</span>
                  <span className="text-[10px] text-charcoal/30">
                    {msg.createdAt?.toDate?.()?.toLocaleDateString('ko-KR') ?? ''}
                  </span>
                </div>
                <p className="text-sm text-charcoal/70 whitespace-pre-line leading-relaxed">{msg.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
