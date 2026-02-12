import config from '@/data/config'
import SectionTitle from '@/components/common/SectionTitle'
import CopyButton from '@/components/common/CopyButton'

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: Record<string, unknown>) => void
      }
    }
  }
}

export default function Share() {
  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(config.kakao.jsKey)
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: config.kakao.shareTitle,
        description: config.kakao.shareDescription,
        imageUrl: config.kakao.shareImageUrl || window.location.origin + '/images/og-image.jpg',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: config.kakao.shareButtonLabel,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    })
  }

  return (
    <section className="py-16 px-6 bg-ivory">
      <SectionTitle title="SHARE" subtitle="청첩장 공유하기" />

      <div className="max-w-[340px] mx-auto flex flex-col items-center gap-4">
        <button
          onClick={shareKakao}
          className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] rounded-lg text-sm font-medium
                     flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.77l-.72 3.57c-.05.25.23.45.45.32L10.67 18H12c5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
          </svg>
          카카오톡으로 공유하기
        </button>

        <CopyButton text={typeof window !== 'undefined' ? window.location.href : ''} label="링크 복사하기" />
      </div>
    </section>
  )
}
