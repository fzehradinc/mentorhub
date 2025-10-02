import React, { useState } from 'react';
import {
  ArrowLeft, Star, MapPin, Clock, Globe, Award, Users, MessageSquare,
  Heart, Share2, Calendar, CheckCircle, TrendingUp, Briefcase,
  Target, Zap, Shield, DollarSign, Send, Instagram, Linkedin,
  ExternalLink, ChevronRight, Rocket, Video
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

type TabType = 'overview' | 'reviews' | 'achievements' | 'group-sessions';

const MentorDetailPage: React.FC<MentorDetailPageProps> = ({ mentorId, onBack }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showFullBio, setShowFullBio] = useState(false);

  const mentor = mockMentors.find(m => m.id === mentorId);
  const mentorReviews = mockReviews.filter(r => r.mentorId === mentorId);
  const similarMentors = mockMentors.filter(m => m.id !== mentorId).slice(0, 4);

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
    { id: '1', name: '3 Seans Paketi', sessions: 3, discount: 10, price: mentor.hourlyRate ? mentor.hourlyRate * 3 * 0.9 : 0, originalPrice: mentor.hourlyRate ? mentor.hourlyRate * 3 : 0 },
    { id: '2', name: '5 Seans Paketi', sessions: 5, discount: 15, price: mentor.hourlyRate ? mentor.hourlyRate * 5 * 0.85 : 0, originalPrice: mentor.hourlyRate ? mentor.hourlyRate * 5 : 0 },
    { id: '3', name: '10 Seans Paketi', sessions: 10, discount: 20, price: mentor.hourlyRate ? mentor.hourlyRate * 10 * 0.8 : 0, originalPrice: mentor.hourlyRate ? mentor.hourlyRate * 10 : 0 }
  ];

  const totalSessions = mentor.totalReviews + 34;
  const totalMentoringMins = 1020;
  const attendanceRate = 96;

  const profileInsights = [
    { id: '1', title: 'Top 50 in Content Strategy', period: 'Jul 2025 - Sep 2025', icon: Award }
  ];

  const availableDates = [
    { day: 'FRI', date: '03 Oct', slots: 10 },
    { day: 'SAT', date: '04 Oct', slots: 8 },
    { day: 'SUN', date: '05 Oct', slots: 8 },
    { day: 'MON', date: '06 Oct', slots: 8 }
  ];

  const timeSlots = ['9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM', '10:00 PM', '10:15 PM'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'reviews', label: 'Reviews', count: mentorReviews.length },
    { id: 'achievements', label: 'Achievements', count: 10 },
    { id: 'group-sessions', label: 'Group sessions', count: null }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Gradient Header Background */}
        <div className="relative h-32 bg-gradient-to-r from-teal-400 via-green-500 to-teal-600">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 -mt-16 relative z-10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri</span>
          </button>

          {/* Profile Header */}
          <div className="relative -mt-12 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={mentor.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300`}
                      alt={mentor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {mentor.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1.5 rounded-full border-2 border-white">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            {mentor.name}
                          </h1>
                          <p className="text-lg text-gray-700 mb-1">
                            {mentor.title} <span className="text-gray-500">at</span> <span className="text-blue-600 font-medium">Google</span>
                          </p>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Mesaj gönder"
                          >
                            <MessageSquare className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Favorilere ekle"
                          >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-gray-600'}`} />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Daha fazla"
                          >
                            <Share2 className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-black text-white rounded-full text-xs font-medium">
                          <span>Member of</span>
                          <Rocket className="w-3 h-3 ml-1" />
                          <span>uxfolio</span>
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">🇺🇸</span>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-t-2xl border-b border-gray-200 mb-8">
            <nav className="flex space-x-8 px-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 py-0.5 px-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* About / Bio */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {showFullBio ? (
                          <>
                            {mentor.bio}
                            <br /><br />
                            10 yılı aşkın süredir product design alanında çalışıyorum. Google, Airbnb ve Uber gibi şirketlerde
                            kullanıcı deneyimi tasarımı konusunda uzmanlaştım. Özellikle 0'dan ürün tasarlamak, kullanıcı araştırması
                            yapmak ve tasarım sistemleri oluşturmak konularında deneyimliyim.
                          </>
                        ) : (
                          <>
                            {mentor.bio.slice(0, 200)}...
                          </>
                        )}
                      </p>
                      <button
                        onClick={() => setShowFullBio(!showFullBio)}
                        className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                      >
                        {showFullBio ? 'Show less' : 'Show more'}
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        <span className="text-sm font-medium">Instagram</span>
                      </a>
                    </div>
                  </div>

                  {/* Profile Insights */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Profile insights</h2>
                      <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                        How do I get these?
                      </a>
                    </div>
                    <div className="space-y-4">
                      {profileInsights.map((insight) => {
                        const Icon = insight.icon;
                        return (
                          <div key={insight.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                              <p className="text-sm text-gray-600">{insight.period}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Background Section */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Background</h2>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-medium">Marketing</span>
                        <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">Product</span>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">+1</button>
                      </div>
                    </div>

                    {/* Disciplines */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Disciplines</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">Copywriting</span>
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">Business Development</span>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">+2</button>
                      </div>
                    </div>

                    {/* Industries */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Industries</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">📚 Education</span>
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">📱 Social media</span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Fluent in</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentor.languages.map((lang) => (
                          <span key={lang} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>Experience</span>
                        <span className="text-sm bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center">6</span>
                      </h2>
                      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View all</button>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">strategic sourcing consultant</h3>
                        <p className="text-blue-600 font-medium">ericsson</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">PRESENT</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Yorumlar</h2>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{mentor.rating}</div>
                      <div className="flex items-center space-x-1">
                        {renderStars(mentor.rating)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{mentorReviews.length} değerlendirme</div>
                    </div>
                  </div>
                  <ReviewsList reviews={mentorReviews} showMenteeName={true} limit={10} />
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Başarılar ve Rozetler</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 p-6 bg-amber-50 rounded-xl border border-amber-200">
                      <Award className="w-10 h-10 text-amber-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">Top 5%</div>
                        <div className="text-sm text-gray-600">Mentor Sıralaması</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 bg-green-50 rounded-xl border border-green-200">
                      <TrendingUp className="w-10 h-10 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">98%</div>
                        <div className="text-sm text-gray-600">Başarı Oranı</div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {mentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Group Sessions Tab */}
              {activeTab === 'group-sessions' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Grup Seansları</h2>
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Henüz grup seansı planlanmamış</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Community Statistics */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Community statistics</h3>
                  <button className="text-teal-600 hover:text-teal-700">
                    <span className="text-sm font-medium">See more</span>
                    <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-8 h-8 text-teal-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalMentoringMins} mins</div>
                      <div className="text-sm text-gray-600">Total mentoring time</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalSessions}</div>
                      <div className="text-sm text-gray-600">Sessions completed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Sessions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Available sessions</h3>
                <p className="text-sm text-gray-600 mb-4">Book 1:1 sessions from the options based on your needs</p>

                {/* Date Selection */}
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 p-3 rounded-lg border-2 text-center min-w-[80px] ${
                        index === 0 ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xs text-gray-600 font-medium">{date.day}</div>
                      <div className="text-sm font-bold text-gray-900">{date.date}</div>
                      <div className="text-xs text-green-600 font-medium mt-1">{date.slots} slots</div>
                    </button>
                  ))}
                  <button className="flex-shrink-0 flex items-center justify-center px-4 text-teal-600 hover:text-teal-700">
                    <span className="text-sm font-medium">View all</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                {/* Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">Available time slots</h4>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.slice(0, 6).map((slot, index) => (
                      <button
                        key={index}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:border-teal-600 hover:bg-teal-50 text-sm font-medium text-gray-700 transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingCalendar(true)}
                  className="w-full mt-4 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Book Session for 03 Oct 2025
                </button>
              </div>

              {/* Pricing Packages */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Paket Seçenekleri</h3>
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPackage === pkg.id
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                          {pkg.discount}% İndirim
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-teal-600">{Math.round(pkg.price)}₺</span>
                        <span className="text-sm text-gray-500 line-through">{Math.round(pkg.originalPrice)}₺</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{pkg.sessions} seans</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Similar Mentors */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Similar mentor profiles</h3>
                  <button className="text-teal-600 hover:text-teal-700">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {similarMentors.map((similar) => (
                    <div key={similar.id} className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer p-2">
                      <img
                        src={similar.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`}
                        alt={similar.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <div className="font-semibold text-gray-900 text-sm truncate">{similar.name}</div>
                      <div className="text-xs text-gray-600 truncate">{similar.title}</div>
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
