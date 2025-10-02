import { Mentor, Mentee, Appointment, Review } from '../types';

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Fatma Yıldız',
    email: 'fatma@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Elektronik Mühendisi',
    company: 'ASELSAN',
    education: 'Bilkent Üniversitesi',
    degree: 'YL Mezunu',
    areas: ['STEM', 'Kadın Mentör', 'Mühendislik'],
    goalsSupported: ['Kadın mühendis sayısını artırmak', 'Mentörlükle cesaret vermek'],
    available: true,
    profileUrl: '/mentors/fatma-yildiz',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'ASELSAN\'da elektronik mühendisi olarak çalışıyorum. Kadın mühendislerin sektörde daha fazla yer alması için mentörlük yapıyorum.',
    expertiseAreas: ['Elektronik Mühendisliği', 'STEM', 'Kariyer Gelişimi', 'Kadın Liderlik'],
    experience: 8,
    languages: ['Türkçe', 'İngilizce'],
    location: 'Ankara, Türkiye',
    rating: 4.9,
    totalReviews: 48,
    hourlyRate: 150,
    achievements: [
      '20+ kadın mühendise mentörlük',
      'ASELSAN\'da proje lideri',
      'IEEE konferanslarında konuşmacı'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/fatmayildiz'
    },
    availableSlots: [
      {
        id: 'slot1',
        date: '2025-01-15',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true
      },
      {
        id: 'slot2',
        date: '2025-01-15',
        startTime: '14:00',
        endTime: '15:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: true,
    isAcademic: false,
    isDataScienceOrSoftware: true,
    isFemale: true,
    isEntrepreneur: false,
    hasInternationalExperience: true,
    tags: {
      education: ['Bilkent Üniversitesi'],
      degree: ['YL Mezunu'],
      company: ['ASELSAN'],
      field: ['Elektronik Mühendisliği', 'STEM'],
      goal: ['Kadın Liderlik', 'Mühendislik Kariyeri']
    }
  },
  {
    id: '2',
    name: 'Ahmet Kaya',
    email: 'ahmet@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Veri Bilimci',
    company: 'Trendyol',
    education: 'Boğaziçi Üniversitesi',
    degree: 'Doktora Mezunu',
    areas: ['Veri Bilimi', 'Machine Learning', 'E-ticaret'],
    goalsSupported: ['Veri bilimi alanına geçiş', 'Akademiden sektöre geçiş'],
    available: true,
    profileUrl: '/mentors/ahmet-kaya',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Trendyol\'da Senior Veri Bilimci olarak çalışıyorum. Akademik geçmişimle sektör deneyimimi birleştirerek mentörlük yapıyorum.',
    expertiseAreas: ['Veri Bilimi', 'Machine Learning', 'Python', 'Kariyer Geçişi'],
    experience: 7,
    languages: ['Türkçe', 'İngilizce'],
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    totalReviews: 67,
    hourlyRate: 200,
    achievements: [
      'Trendyol\'da ML modelleri geliştirdi',
      '30+ kişiye veri bilimi mentörlüğü',
      'Uluslararası konferanslarda sunum'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmetkaya'
    },
    availableSlots: [
      {
        id: 'slot3',
        date: '2025-01-16',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-02-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: false,
    isAcademic: false,
    isDataScienceOrSoftware: false,
    isFemale: false,
    isEntrepreneur: true,
    hasInternationalExperience: true,
    tags: {
      education: ['Boğaziçi Üniversitesi'],
      degree: ['Doktora Mezunu'],
      company: ['Trendyol'],
      field: ['Veri Bilimi', 'Machine Learning'],
      goal: ['Veri Bilimi Geçişi', 'Akademik Kariyer']
    }
  },
  {
    id: '3',
    name: 'Zeynep Demir',
    email: 'zeynep@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Girişimci & CEO',
    company: 'TechStart',
    education: 'İTÜ',
    degree: 'Lisans Mezunu',
    areas: ['Girişimcilik', 'Teknoloji', 'Liderlik'],
    goalsSupported: ['Startup kurmak', 'Girişimcilik', 'Yatırım almak'],
    available: true,
    profileUrl: '/mentors/zeynep-demir',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Kendi teknoloji startup\'ımı kurdum ve 2 milyon dolar yatırım aldım. Girişimcilik yolculuğunda mentörlük yapıyorum.',
    expertiseAreas: ['Girişimcilik', 'Startup', 'Yatırım', 'Liderlik'],
    experience: 5,
    languages: ['Türkçe', 'İngilizce'],
    location: 'İstanbul, Türkiye',
    rating: 4.7,
    totalReviews: 34,
    hourlyRate: 300,
    achievements: [
      '2M$ yatırım aldı',
      '15+ girişimciye mentörlük',
      'Forbes 30 Under 30 listesinde'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/zeynepdemir',
      website: 'https://techstart.com.tr'
    },
    availableSlots: [
      {
        id: 'slot4',
        date: '2025-01-17',
        startTime: '15:00',
        endTime: '16:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-03-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: true,
    isAcademic: false,
    isDataScienceOrSoftware: false,
    isFemale: true,
    isEntrepreneur: false,
    hasInternationalExperience: false,
    tags: {
      education: ['İTÜ'],
      degree: ['Lisans'],
      company: ['TechStart'],
      field: ['Girişimcilik', 'Teknoloji'],
      goal: ['Startup Kurma', 'Yatırım Alma']
    }
  },
  {
    id: '4',
    name: 'Dr. Mehmet Özkan',
    email: 'mehmet@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Doçent Dr.',
    company: 'ODTÜ',
    education: 'ODTÜ',
    degree: 'Doktora Mezunu',
    areas: ['Akademik Kariyer', 'Yurt Dışı Eğitim', 'Araştırma'],
    goalsSupported: ['Yurt dışı yüksek lisans', 'Akademik kariyer', 'Doktora başvurusu'],
    available: true,
    profileUrl: '/mentors/mehmet-ozkan',
    imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'ODTÜ\'de Doçent olarak çalışıyorum. Yurt dışı eğitim ve akademik kariyer konularında mentörlük yapıyorum.',
    expertiseAreas: ['Akademik Kariyer', 'Yurt Dışı Eğitim', 'Araştırma', 'Doktora'],
    experience: 15,
    languages: ['Türkçe', 'İngilizce'],
    location: 'Ankara, Türkiye',
    rating: 4.9,
    totalReviews: 89,
    hourlyRate: 250,
    achievements: [
      '40+ bilimsel makale yayınladı',
      '60+ öğrenciye yurt dışı eğitim mentörlüğü',
      'TÜBİTAK projesi yürütücüsü'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mehmetozkan'
    },
    availableSlots: [
      {
        id: 'slot5',
        date: '2025-01-18',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-04-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: false,
    isAcademic: true,
    isDataScienceOrSoftware: false,
    isFemale: false,
    isEntrepreneur: false,
    hasInternationalExperience: true,
    tags: {
      education: ['ODTÜ'],
      degree: ['Doktora'],
      company: ['ODTÜ'],
      field: ['Akademik Kariyer', 'Araştırma'],
      goal: ['Yurt Dışı Eğitim', 'Akademik Kariyer']
    }
  },
  {
    id: '5',
    name: 'Ayşe Kılıç',
    email: 'ayse@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'UX Designer',
    company: 'Getir',
    education: 'Sabancı Üniversitesi',
    degree: 'YL Mezunu',
    areas: ['UX Design', 'Tasarım', 'Teknoloji'],
    goalsSupported: ['UX alanına geçiş', 'Tasarım kariyeri', 'Teknoloji sektörü'],
    available: true,
    profileUrl: '/mentors/ayse-kilic',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Getir\'da Senior UX Designer olarak çalışıyorum. Tasarım alanına geçiş yapmak isteyenlere mentörlük yapıyorum.',
    expertiseAreas: ['UX Design', 'UI Design', 'Tasarım Düşüncesi', 'Kariyer Geçişi'],
    experience: 6,
    languages: ['Türkçe', 'İngilizce'],
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    totalReviews: 52,
    hourlyRate: 180,
    achievements: [
      'Getir\'da 10M+ kullanıcı deneyimi tasarladı',
      '25+ kişiye UX mentörlüğü',
      'Design Week İstanbul konuşmacısı'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/aysekilic'
    },
    availableSlots: [
      {
        id: 'slot6',
        date: '2025-01-19',
        startTime: '16:00',
        endTime: '17:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-05-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: true,
    isAcademic: false,
    isDataScienceOrSoftware: false,
    isFemale: true,
    isEntrepreneur: false,
    hasInternationalExperience: false,
    tags: {
      education: ['Sabancı Üniversitesi'],
      degree: ['YL Mezunu'],
      company: ['Getir'],
      field: ['UX Design', 'Tasarım'],
      goal: ['UX Geçişi', 'Tasarım Kariyeri']
    }
  },
  {
    id: '6',
    name: 'Can Yılmaz',
    email: 'can@example.com',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Yazılım Geliştirici',
    company: 'Hepsiburada',
    education: 'Hacettepe Üniversitesi',
    degree: 'Lisans Mezunu',
    areas: ['Yazılım Geliştirme', 'Backend', 'E-ticaret'],
    goalsSupported: ['Yazılım alanına geçiş', 'Backend geliştirme', 'Kariyer gelişimi'],
    available: false,
    profileUrl: '/mentors/can-yilmaz',
    imageUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Hepsiburada\'da Senior Backend Developer olarak çalışıyorum. Yazılım alanına geçiş yapmak isteyenlere mentörlük yapıyorum.',
    expertiseAreas: ['Backend Development', 'Java', 'Spring Boot', 'Mikroservisler'],
    experience: 8,
    languages: ['Türkçe', 'İngilizce'],
    location: 'İstanbul, Türkiye',
    rating: 4.7,
    totalReviews: 73,
    hourlyRate: 170,
    achievements: [
      'Hepsiburada\'da yüksek trafikli sistemler geliştirdi',
      '40+ kişiye yazılım mentörlüğü',
      'Açık kaynak projelere katkı'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/canyilmaz',
      github: 'https://github.com/canyilmaz'
    },
    availableSlots: [
      {
        id: 'slot7',
        date: '2025-01-20',
        startTime: '13:00',
        endTime: '14:00',
        isAvailable: true
      }
    ],
    isVerified: true,
    createdAt: '2024-06-01T00:00:00Z',
    isNewMentor: false,
    isAvailableNow: false,
    isAcademic: false,
    isDataScienceOrSoftware: true,
    isFemale: false,
    isEntrepreneur: false,
    hasInternationalExperience: false,
    tags: {
      education: ['Hacettepe Üniversitesi'],
      degree: ['Lisans Mezunu'],
      company: ['Hepsiburada'],
      field: ['Backend Development', 'Yazılım'],
      goal: ['Yazılım Geçişi', 'Backend Uzmanlığı']
    }
  }
];

export const mockMentees: Mentee[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'mentee',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Junior developer looking to advance my career',
    interests: ['React', 'Career Development'],
    goals: ['Kariyer Geçişi', 'Teknik Liderlik', 'Yurt Dışı Kariyer'],
    createdAt: '2024-06-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    role: 'mentee',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Computer science student interested in data science',
    interests: ['Data Science', 'Machine Learning', 'Python'],
    goals: ['Veri Bilimi Geçişi', 'Yurt Dışı Yüksek Lisans'],
    createdAt: '2024-06-01T00:00:00Z',
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    mentorId: 'mentor_elif30',
    menteeId: 'menti_zeynep23',
    dateTime: '2025-01-20T10:00:00Z',
    topic: 'Kariyer Geçişi Danışmanlığı',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    duration: 60,
    status: 'pending',
    notes: 'STEM alanında kariyer geçişi konuşulacak',
    createdAt: '2025-01-15T00:00:00Z'
  },
  {
    id: '2',
    mentorId: '2',
    menteeId: 'menti_zeynep23',
    dateTime: '2025-01-25T14:00:00Z',
    topic: 'Veri Bilimi Alanına Geçiş',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/xyz-abc-def',
    duration: 45,
    status: 'confirmed',
    notes: 'Python ve ML konularında rehberlik',
    createdAt: '2025-01-16T00:00:00Z'
  },
  {
    id: '3',
    mentorId: 'mentor_elif30',
    menteeId: '1',
    dateTime: '2025-01-10T16:00:00Z',
    topic: 'CV İnceleme ve Geri Bildirim',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/987654321',
    duration: 30,
    status: 'completed',
    notes: 'CV gözden geçirildi, öneriler verildi',
    createdAt: '2025-01-08T00:00:00Z'
  },
  {
    id: '4',
    mentorId: '3',
    menteeId: 'menti_zeynep23',
    dateTime: '2025-01-12T11:00:00Z',
    topic: 'Girişimcilik ve Startup Kurma',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/startup-meeting',
    duration: 60,
    status: 'completed',
    notes: 'İş planı ve yatırım süreci anlatıldı',
    createdAt: '2025-01-09T00:00:00Z'
  },
  {
    id: '5',
    mentorId: 'mentor_elif30',
    menteeId: 'menti_zeynep23',
    dateTime: '2025-01-15T09:00:00Z',
    topic: 'Yurt Dışı Başvuru Süreci',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/555666777',
    duration: 60,
    status: 'confirmed',
    notes: 'Oxford başvuru süreci detayları',
    createdAt: '2025-01-12T00:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    mentorId: '1',
    menteeId: '1',
    appointmentId: '1',
    rating: 5,
    comment: 'Sarah was incredibly helpful! She provided great insights about career progression and gave me actionable advice.',
    createdAt: '2025-01-15T12:00:00Z',
    mentorName: 'Sarah Johnson',
    menteeName: 'Alex Thompson'
  },
  {
    id: '2',
    mentorId: '1',
    menteeId: '5',
    appointmentId: '2',
    rating: 5,
    comment: 'Excellent session! Sarah helped me understand system design concepts clearly.',
    createdAt: '2025-01-10T12:00:00Z',
    mentorName: 'Sarah Johnson',
    menteeName: 'Lisa Wang'
  }
];

export const expertiseOptions = [
  'Elektronik Mühendisliği', 'Veri Bilimi', 'UX Design', 'Girişimcilik',
  'Akademik Kariyer', 'Backend Development', 'STEM', 'Machine Learning',
  'Yazılım Geliştirme', 'Tasarım', 'Liderlik', 'Kariyer Gelişimi',
  'Yurt Dışı Eğitim', 'Startup', 'Teknoloji'
];

export const languageOptions = [
  'Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca',
  'İtalyanca', 'Rusça', 'Arapça'
];

export const locationOptions = [
  'İstanbul, Türkiye', 'Ankara, Türkiye', 'İzmir, Türkiye', 'Bursa, Türkiye',
  'Antalya, Türkiye', 'Adana, Türkiye', 'Konya, Türkiye', 'Gaziantep, Türkiye',
  'Uzaktan', 'Yurt Dışı'
]

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1', // Alex (mentee)
    receiverId: '1', // Fatma (mentor)
    content: 'Merhaba Fatma Hanım, sizi mentör olarak seçtim. Elektronik mühendisliği alanında kariyer planlaması konusunda yardımınıza ihtiyacım var.',
    timestamp: '2025-01-14T10:30:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: '1', // Fatma (mentor)
    receiverId: '1', // Alex (mentee)
    content: 'Merhaba Alex! Tabii ki yardımcı olmaktan mutluluk duyarım. Hangi konularda özellikle destek almak istiyorsun?',
    timestamp: '2025-01-14T11:15:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '1', // Alex (mentee)
    receiverId: '1', // Fatma (mentor)
    content: 'Özellikle ASELSAN gibi savunma sanayi şirketlerinde çalışma fırsatları ve bu alanda kendimi nasıl geliştirebileceğim konusunda bilgi almak istiyorum.',
    timestamp: '2025-01-14T14:20:00Z',
    isRead: false,
    type: 'text'
  },
  {
    id: '4',
    senderId: '1', // Alex (mentee)
    receiverId: '2', // Ahmet (mentor)
    content: 'Merhaba Ahmet Bey, veri bilimi alanına geçiş yapmak istiyorum. Trendyol\'daki deneyimlerinizi paylaşabilir misiniz?',
    timestamp: '2025-01-13T16:45:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '5',
    senderId: '2', // Ahmet (mentor)
    receiverId: '1', // Alex (mentee)
    content: 'Elbette! Veri bilimi alanına geçiş için öncelikle Python ve SQL öğrenmen önemli. Hangi alanda çalışıyorsun şu anda?',
    timestamp: '2025-01-13T17:30:00Z',
    isRead: true,
    type: 'text'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'appointment',
    title: 'Randevu Onaylandı',
    description: 'Fatma Yıldız ile 20 Ocak 2025 tarihli görüşmeniz onaylandı.',
    isRead: false,
    createdAt: '2025-01-15T09:00:00Z',
    actionUrl: '/appointments',
    icon: '📅'
  },
  {
    id: '2',
    userId: '1',
    type: 'message',
    title: 'Yeni Mesaj',
    description: 'Fatma Yıldız size yeni bir mesaj gönderdi.',
    isRead: false,
    createdAt: '2025-01-14T11:15:00Z',
    actionUrl: '/messages',
    icon: '💬'
  },
  {
    id: '3',
    userId: '1',
    type: 'review',
    title: 'Değerlendirme Bekleniyor',
    description: 'Dr. Mehmet Özkan ile yaptığınız görüşmeyi değerlendirmeyi unutmayın.',
    isRead: true,
    createdAt: '2025-01-12T18:00:00Z',
    actionUrl: '/appointments',
    icon: '⭐'
  },
  {
    id: '4',
    userId: '1',
    type: 'system',
    title: 'Profil Güncellendi',
    description: 'Profiliniz başarıyla güncellendi ve yayınlandı.',
    isRead: true,
    createdAt: '2025-01-10T14:30:00Z',
    icon: '✅'
  },
  {
    id: '5',
    userId: '1',
    type: 'appointment',
    title: 'Randevu İptal Edildi',
    description: 'Can Yılmaz 18 Ocak tarihli randevunuzu iptal etti.',
    isRead: true,
    createdAt: '2025-01-09T10:15:00Z',
    actionUrl: '/appointments',
    icon: '❌'
  }
];