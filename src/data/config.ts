export interface BankAccount {
  bank: string
  accountNumber: string
  holder: string
}

export interface WeddingConfig {
  groom: {
    name: string
    fatherName: string
    motherName: string
    phone: string
    relation: string
  }
  bride: {
    name: string
    fatherName: string
    motherName: string
    phone: string
    relation: string
  }
  wedding: {
    date: string
    time: string
    timeDetail: string
    dDay: Date
  }
  venue: {
    name: string
    hall: string
    address: string
    addressDetail: string
    phone: string
    lat: number
    lng: number
    transport: {
      subway: string[]
      bus: string[]
      parking: string
      car: string
    }
  }
  accounts: {
    groom: BankAccount[]
    bride: BankAccount[]
  }
  gallery: {
    images: string[]
  }
  music: {
    src: string
    title: string
    autoPlay: boolean
  }
  kakao: {
    jsKey: string
    shareTitle: string
    shareDescription: string
    shareImageUrl: string
    shareButtonLabel: string
  }
  meta: {
    title: string
    greetingTitle: string
    greetingMessage: string
    closingMessage: string
  }
}

const config: WeddingConfig = {
  groom: {
    name: '김철수',
    fatherName: '김아버지',
    motherName: '김어머니',
    phone: '010-1234-5678',
    relation: '장남',
  },
  bride: {
    name: '이영희',
    fatherName: '이아버지',
    motherName: '이어머니',
    phone: '010-9876-5432',
    relation: '장녀',
  },
  wedding: {
    date: '2026-05-16',
    time: '오후 2시',
    timeDetail: '토요일 오후 2시',
    dDay: new Date('2027-05-16T14:00:00+09:00'),
  },
  venue: {
    name: '더채플앳청담',
    hall: '그랜드홀',
    address: '서울특별시 강남구 청담동 123-45',
    addressDetail: '2층 그랜드홀',
    phone: '02-1234-5678',
    lat: 37.5247,
    lng: 127.0474,
    transport: {
      subway: ['7호선 청담역 2번 출구 도보 5분'],
      bus: ['간선 143, 240 / 지선 3011, 4312'],
      parking: '건물 지하 주차장 2시간 무료',
      car: '네비게이션 "더채플앳청담" 검색',
    },
  },
  accounts: {
    groom: [
      { bank: '신한은행', accountNumber: '110-123-456789', holder: '김철수' },
      { bank: '국민은행', accountNumber: '123-45-6789012', holder: '김아버지' },
    ],
    bride: [
      { bank: '우리은행', accountNumber: '1002-123-456789', holder: '이영희' },
      { bank: '하나은행', accountNumber: '456-78-9012345', holder: '이어머니' },
    ],
  },
  gallery: {
    images: [
      '/images/gallery/photo1.png',
      '/images/gallery/photo2.png',
      '/images/gallery/photo3.png',
      '/images/gallery/photo4.png',
      '/images/gallery/photo5.png',
      '/images/gallery/photo6.png',
      '/images/gallery/photo7.png',
      '/images/gallery/photo8.png',
    ],
  },
  music: {
    src: '/music/wedding-bgm.mp3',
    title: 'Wedding BGM',
    autoPlay: true,
  },
  kakao: {
    jsKey: 'YOUR_KAKAO_JS_KEY',
    shareTitle: '김철수 ♥ 이영희 결혼합니다',
    shareDescription: '2026년 5월 16일 토요일 오후 2시\n더채플앳청담 그랜드홀',
    shareImageUrl: '',
    shareButtonLabel: '청첩장 보기',
  },
  meta: {
    title: '김철수 ♥ 이영희 결혼합니다',
    greetingTitle: '소중한 분들을 초대합니다',
    greetingMessage:
      '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어가고자 합니다.\n\n저희 두 사람이 사랑의 서약을 하는 날\n오셔서 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.',
    closingMessage: '행복하게 잘 살겠습니다 ♥',
  },
}

export default config
