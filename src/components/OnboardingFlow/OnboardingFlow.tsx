import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface OnboardingData {
  name: string;
  location: string;
  currentRole: string;
  goals: string[];
  interests: string[];
  experienceLevel: string;
  expectations: string[];
  communicationPreference: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    location: '',
    currentRole: '',
    goals: [],
    interests: [],
    experienceLevel: '',
    expectations: [],
    communicationPreference: ''
  });

  const totalSteps = 6; // 5 steps + final

  const motivationalQuotes = [
    "Her yolculuk küçük bir adımla başlar.",
    "Kendi hikâyeni paylaş, doğru yol arkadaşını bul.",
    "Hedeflerini bilen, yolunu kısaltır.",
    "Bugünkü seviyen, yarının potansiyeline engel değil.",
    "Doğru iletişim, en hızlı ilerlemenin anahtarıdır.",
    "Başarı, doğru rehberle çok daha hızlı gelir."
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof OnboardingData, value: string) => {
    const currentArray = data[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateData(field, newArray);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return true;
      case 2: return data.name && data.location && data.currentRole;
      case 3: return data.goals.length > 0;
      case 4: return data.interests.length > 0 && data.experienceLevel;
      case 5: return data.expectations.length > 0 && data.communicationPreference;
      case 6: return true;
      default: return false;
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Adım {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          %{Math.round((currentStep / totalSteps) * 100)} tamamlandı
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <p className="text-center text-blue-600 font-medium italic">
        "{motivationalQuotes[currentStep - 1]}"
      </p>
    </div>
  );

  const renderStep1 = () => (
    <div className="text-center animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Hayallerine doğru ilk adımı at 🚀
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Senin için doğru mentörü bulmaya sadece birkaç adım kaldı.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Hedeflerini Belirle</h3>
            <p className="text-sm text-gray-600">Nereye varmak istediğini söyle</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Eşleşme Bul</h3>
            <p className="text-sm text-gray-600">Sana uygun mentörü keşfet</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Büyümeye Başla</h3>
            <p className="text-sm text-gray-600">Yolculuğuna hızla başla</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Kendini Tanıt
        </h2>
        <p className="text-gray-600">
          Seni daha iyi tanımamız için birkaç temel bilgi paylaş
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Adınızı ve soyadınızı giriniz"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Konum *
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ülke / Şehir (örn: İstanbul, Türkiye)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Mevcut Rolün *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['Öğrenci', 'Çalışan', 'Girişimci'].map((role) => (
              <button
                key={role}
                onClick={() => updateData('currentRole', role)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.currentRole === role
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">{role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Hedeflerini Belirle
        </h2>
        <p className="text-gray-600">
          Mentörlükten en çok ne bekliyorsun? (Birden fazla seçebilirsin)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'career', label: 'Kariyer yönlendirme', icon: '🎯' },
          { key: 'technical', label: 'Teknik beceri geliştirme', icon: '💻' },
          { key: 'international', label: 'Yurt dışı deneyimi', icon: '🌍' },
          { key: 'entrepreneurship', label: 'Girişimcilik', icon: '🚀' },
          { key: 'networking', label: 'Networking', icon: '🤝' }
        ].map((goal) => (
          <button
            key={goal.key}
            onClick={() => toggleArrayValue('goals', goal.key)}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 text-left ${
              data.goals.includes(goal.key)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{goal.icon}</span>
              <div>
                <div className="font-semibold">{goal.label}</div>
              </div>
              {data.goals.includes(goal.key) && (
                <Check className="w-5 h-5 text-blue-600 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          İlgi Alanları & Deneyim Seviyesi
        </h2>
        <p className="text-gray-600">
          Hangi alanlarda gelişmek istiyorsun ve mevcut seviyeni belirt
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">İlgi Alanları</h3>
          <div className="flex flex-wrap gap-3">
            {['Veri Bilimi', 'UX Design', 'Liderlik', 'Tasarım', 'Girişimcilik'].map((interest) => (
              <button
                key={interest}
                onClick={() => toggleArrayValue('interests', interest)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                  data.interests.includes(interest)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {interest}
                {data.interests.includes(interest) && (
                  <Check className="w-4 h-4 inline ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deneyim Seviyesi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'beginner', label: 'Başlangıç', desc: 'Yeni başlıyorum' },
              { key: 'intermediate', label: 'Orta', desc: 'Temel bilgim var' },
              { key: 'advanced', label: 'İleri', desc: 'Deneyimliyim' }
            ].map((level) => (
              <button
                key={level.key}
                onClick={() => updateData('experienceLevel', level.key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.experienceLevel === level.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{level.label}</div>
                <div className="text-sm text-gray-600">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Beklenti & İletişim Tercihi
        </h2>
        <p className="text-gray-600">
          Mentörlük sürecinde nasıl bir deneyim yaşamak istiyorsun?
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Beklentilerin</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'motivation', label: 'Motivasyon', icon: '⚡' },
              { key: 'technical', label: 'Teknik bilgi', icon: '🧠' },
              { key: 'network', label: 'Network', icon: '🌐' }
            ].map((expectation) => (
              <button
                key={expectation.key}
                onClick={() => toggleArrayValue('expectations', expectation.key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.expectations.includes(expectation.key)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{expectation.icon}</div>
                <div className="font-semibold">{expectation.label}</div>
                {data.expectations.includes(expectation.key) && (
                  <Check className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Tercihi</h3>
          <div className="space-y-3">
            {[
              { key: 'video', label: 'Online görüşme (Zoom/Meet)', desc: 'Yüz yüze görüşmeler' },
              { key: 'messaging', label: 'Mesajlaşma (Chat/Email)', desc: 'Yazılı iletişim' },
              { key: 'hybrid', label: 'Karma', desc: 'Her ikisini de kullanabilirim' }
            ].map((comm) => (
              <button
                key={comm.key}
                onClick={() => updateData('communicationPreference', comm.key)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 text-left ${
                  data.communicationPreference === comm.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{comm.label}</div>
                <div className="text-sm text-gray-600">{comm.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="text-center animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Artık hazırsın ✨
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Seçimlerine göre sana uygun mentorları hazırladık.
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Profilin Özeti</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>İsim:</strong> {data.name}</p>
              <p><strong>Konum:</strong> {data.location}</p>
              <p><strong>Rol:</strong> {data.currentRole}</p>
              <p><strong>Seviye:</strong> {data.experienceLevel}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Hedeflerin</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Ana Hedefler:</strong> {data.goals.length} seçim</p>
              <p><strong>İlgi Alanları:</strong> {data.interests.join(', ')}</p>
              <p><strong>İletişim:</strong> {data.communicationPreference}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">🎯 Sana Özel Eşleşmeler Hazır!</h3>
        <p className="text-blue-100">
          Profiline uygun {Math.floor(Math.random() * 5) + 8} mentör bulundu. 
          Hemen keşfetmeye başla!
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mentee Onboarding</h1>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentStep === 1 ? 'Çıkış' : 'Geri'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            <span>
              {currentStep === 6 ? 'Mentor Önerilerini Gör' : 'Devam Et'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardingFlow;