import React, { useState } from 'react';
import {
  ArrowLeft, Star, MapPin, Clock, Globe, Award, Users, MessageSquare,
  Heart, Share2, Calendar, CheckCircle, TrendingUp, Briefcase, BookOpen,
  Target, Zap, Shield, DollarSign, Send
} from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import CalendarSlotSelection from '../components/CalendarSlotSelection/CalendarSlotSelection';
import { mockMentors, mockReviews } from '../data/mockData';
import { Mentor } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface MentorDetailPageProps {
  mentorId: string;
  onBack: () => void;
}

const MentorDetailPage: React.FC<MentorDetailPageProps> = ({ mentorId, onBack }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const mentor = mockMentors.find(m => m.id === mentorId);
  const mentorReviews = mockReviews.filter(r => r.mentorId === mentorId);
  const similarMentors = mockMentors.filter(m => m.id !== mentorId).slice(0, 3);

  if (!mentor) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentor bulunamadı</h1>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium">
            ← Mentorlara geri dön
          </button>
        </div>
      </Layout>
    );
  }

  const packages = [
    { id: '1', name: '3 Seans Paketi', sessions: 3, discount: 10, price: mentor.hourlyRate ? mentor.hourlyRate * 3 * 0.9 : 0 },
    { id: '2', name: '5 Seans Paketi', sessions: 5, discount: 15, price: mentor.hourlyRate ? mentor.hourlyRate * 5 * 0.85 : 0 },
    { id: '3', name: '10 Seans Paketi', sessions: 10, discount: 20, price: mentor.hourlyRate ? mentor.hourlyRate * 10 * 0.8 : 0 }
  ];

  const totalSessions = mentor.totalReviews + 47;
  const attendanceRate = 96;
  const responseTime = '2 saat';

  const badges = [
    { id: '1', name: 'Top Rated', icon: Star, color: 'bg-amber-100 text-amber-700' },
    { id: '2', name: 'Available ASAP', icon: Zap, color: 'bg-green-100 text-green-700' },
    { id: '3', name: 'Verified', icon: Shield, color: 'bg-blue-100 text-blue-700' }
  ];

  const workExperience = [
    { company: 'Google', position: 'Senior Product Designer', duration: '2020 - Present' },
    { company: 'Airbnb', position: 'Product Designer', duration: '2017 - 2020' },
    { company: 'Uber', position: 'UX Designer', duration: '2015 - 2017' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Cover Photo */}
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri</span>
          </button>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex items-center space-x-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Favorilere ekle"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-white'}`} />
            </button>
            <button
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Paylaş"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="relative -mt-24 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={mentor.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300`}
                      alt={mentor.name}
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    {mentor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {mentor.name}
                      </h1>
                      <p className="text-xl text-blue-600 font-semibold mb-1">
                        {mentor.title}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Google • San Francisco, CA
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {badges.map(badge => {
                          const Icon = badge.icon;
                          return (
                            <span
                              key={badge.id}
                              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{badge.name}</span>
                            </span>
                          );
                        })}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{mentor.experience}+ yıl deneyim</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>{mentor.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col items-start lg:items-end gap-3">
                      {mentor.hourlyRate && (
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">
                            {mentor.hourlyRate}₺
                          </div>
                          <div className="text-gray-600">seans başı</div>
                        </div>
                      )}

                      <button
                        onClick={() => setShowBookingCalendar(true)}
                        className="w-full lg:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold min-h-[44px]"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Seans Rezervasyonu Yap</span>
                      </button>

                      <button
                        className="w-full lg:w-auto flex items-center justify-center space-x-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold min-h-[44px]"
                      >
                        <Send className="w-5 h-5" />
                        <span>Mesaj Gönder</span>
                      </button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      {renderStars(mentor.rating)}
                      <span className="text-lg font-bold text-gray-900">{mentor.rating}</span>
                      <span className="text-gray-500">({mentor.totalReviews} değerlendirme)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{totalSessions}</div>
                  <div className="text-sm text-gray-600">Toplam Seans</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{attendanceRate}%</div>
                  <div className="text-sm text-gray-600">Katılım Oranı</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{responseTime}</div>
                  <div className="text-sm text-gray-600">Yanıt Süresi</div>
                </div>
              </div>

              {/* About / Bio */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hakkında</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {mentor.bio}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  10 yılı aşkın süredir product design alanında çalışıyorum. Google, Airbnb ve Uber gibi şirketlerde
                  kullanıcı deneyimi tasarımı konusunda uzmanlaştım. Özellikle 0'dan ürün tasarlamak, kullanıcı araştırması
                  yapmak ve tasarım sistemleri oluşturmak konularında deneyimliyim.
                </p>
              </div>

              {/* Expertise Areas */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span>Uzmanlık Alanları</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {mentor.expertiseAreas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  <span>İş Deneyimi</span>
                </h2>
                <div className="space-y-4">
                  {workExperience.map((exp, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600">{exp.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  <span>Başarılar ve Rozetler</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <Award className="w-8 h-8 text-amber-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Top 5%</div>
                      <div className="text-sm text-gray-600">Mentor Sıralaması</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">98%</div>
                      <div className="text-sm text-gray-600">Başarı Oranı</div>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {mentor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <span>Yorumlar ({mentorReviews.length})</span>
                </h2>
                <ReviewsList reviews={mentorReviews} showMenteeName={true} limit={5} />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Pricing Packages */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Seans Paketleri</span>
                </h3>
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        selectedPackage === pkg.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                          {pkg.discount}% İndirim
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{Math.round(pkg.price)}₺</div>
                      <div className="text-sm text-gray-600">{pkg.sessions} seans</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Müsaitlik</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hafta İçi</span>
                    <span className="font-semibold text-green-600">Müsait</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hafta Sonu</span>
                    <span className="font-semibold text-green-600">Müsait</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Açık Slot</span>
                    <span className="font-semibold text-gray-900">{mentor.availableSlots.length}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingCalendar(true)}
                  className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Takvimi Görüntüle
                </button>
              </div>

              {/* Languages & Skills */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Diller</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Similar Mentors */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Benzer Mentorlar</span>
                </h3>
                <div className="space-y-4">
                  {similarMentors.map((similar) => (
                    <div key={similar.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <img
                        src={similar.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
                        alt={similar.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{similar.name}</div>
                        <div className="text-sm text-gray-600 truncate">{similar.title}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-xs text-gray-600">{similar.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Calendar Modal */}
        {showBookingCalendar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <CalendarSlotSelection
                mentor={mentor}
                onClose={() => setShowBookingCalendar(false)}
                onSelectSlot={(slot) => {
                  console.log('Selected slot:', slot);
                  setShowBookingCalendar(false);
                  alert(`Seans rezervasyonu yapıldı: ${slot.day} - ${slot.startTime}`);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MentorDetailPage;
