import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface OnboardingData {
  category: string;
  goalLevel: string;
  budget: string;
  timeAvailability: string;
  mentorType: string;
  goalDescription: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    category: '',
    goalLevel: '',
    budget: '',
    timeAvailability: '',
    mentorType: '',
    goalDescription: ''
  });

  const totalSteps = 4;

  const motivationalQuotes = [
    "Her yolculuk küçük bir adımla başlar.",
    "Hedeflerini bilen, yolunu kısaltır.",
    "Doğru iletişim, en hızlı ilerlemenin anahtarıdır.",
    "Bugünkü seviyen, yarının potansiyeline engel değil.",
    "Başarı, doğru rehberle çok daha hızlı gelir."
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - complete onboarding
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.category !== '';
      case 2: return data.goalLevel !== '';
      case 3: return data.budget !== '' && data.timeAvailability !== '';
      case 4: return true; // Optional step
      default: return false;
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100;
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Adım {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          %{Math.round(getProgressPercentage())} tamamlandı
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <p className="text-center text-blue-600 font-medium italic">
        "{motivationalQuotes[currentStep - 1]}"
      </p>
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ne için destek istiyorsun?
        </h2>
        <p className="text-gray-600">
          Sana en uygun mentörü bulabilmemiz için alanını seç
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'borsa', label: 'Borsa & Yatırım', icon: '📈' },
          { key: 'kariyer', label: 'Kariyer / İş', icon: '💼' },
          { key: 'universite', label: 'Üniversite & Eğitim', icon: '🎓' },
          { key: 'kisisel', label: 'Kişisel Gelişim', icon: '🌟' },
          { key: 'hayat', label: 'Hayat Değişimi', icon: '🔄' }
        ].map((category) => (
          <button
            key={category.key}
            onClick={() => updateData('category', category.key)}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 text-left ${
              data.category === category.key
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <div className="font-semibold">{category.label}</div>
              </div>
              {data.category === category.key && (
                <Check className="w-5 h-5 text-blue-600 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Hedefin hangisine daha yakın?
        </h2>
        <p className="text-gray-600">
          Bu sayede sana uygun deneyim seviyesindeki mentörlerle eşleştirebiliriz
        </p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'temel', label: 'Temel Bilgi', desc: 'Konuya yeni başlıyorum, temel bilgileri öğrenmek istiyorum' },
          { key: 'stratejik', label: 'Stratejik Yol Haritası', desc: 'Genel bir plan ve yönlendirme arıyorum' },
          { key: 'somut', label: 'Somut Hedef', desc: 'Belirli bir hedefe ulaşmak için rehberlik istiyorum' },
          { key: 'uzun', label: 'Uzun Süreli Koçluk', desc: 'Sürekli destek ve gelişim için mentor arıyorum' }
        ].map((goal) => (
          <button
            key={goal.key}
            onClick={() => updateData('goalLevel', goal.key)}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 text-left ${
              data.goalLevel === goal.key
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg mb-1">{goal.label}</div>
                <div className="text-sm text-gray-600">{goal.desc}</div>
              </div>
              {data.goalLevel === goal.key && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Seans başı bütçe aralığın ve müsait zamanın nedir?
        </h2>
        <p className="text-gray-600">
          Bu bilgiler sayesinde uygun mentörlerle eşleştirebiliriz
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bütçe Aralığı</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: '500-1000', label: '500-1000 TL', desc: 'Uygun fiyat' },
              { key: '1000-2000', label: '1000-2000 TL', desc: 'Orta segment' },
              { key: '2000+', label: '2000+ TL', desc: 'Premium' }
            ].map((budget) => (
              <button
                key={budget.key}
                onClick={() => updateData('budget', budget.key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.budget === budget.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{budget.label}</div>
                <div className="text-sm text-gray-600">{budget.desc}</div>
                {data.budget === budget.key && (
                  <Check className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Availability */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Müsait Zamanın</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'hafta-ici', label: 'Hafta içi akşam', desc: '18:00-22:00' },
              { key: 'hafta-sonu', label: 'Hafta sonu', desc: 'Cumartesi-Pazar' },
              { key: 'esnek', label: 'Esnek', desc: 'Her zaman uygun' }
            ].map((time) => (
              <button
                key={time.key}
                onClick={() => updateData('timeAvailability', time.key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.timeAvailability === time.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{time.label}</div>
                <div className="text-sm text-gray-600">{time.desc}</div>
                {data.timeAvailability === time.key && (
                  <Check className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Daha fazla bilgi vermek ister misin?
        </h2>
        <p className="text-gray-600">
          Bu adım opsiyonel - daha kişiselleştirilmiş öneriler için
        </p>
      </div>

      <div className="space-y-6">
        {/* Mentor Type */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tercih Ettiğin Mentor Tipi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'akademik', label: 'Akademik', desc: 'Üniversite, araştırma' },
              { key: 'practitioner', label: 'Practitioner', desc: 'Sektör deneyimi' },
              { key: 'koc', label: 'Koç', desc: 'Kişisel gelişim odaklı' }
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => updateData('mentorType', type.key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  data.mentorType === type.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{type.label}</div>
                <div className="text-sm text-gray-600">{type.desc}</div>
                {data.mentorType === type.key && (
                  <Check className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Goal Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kısa Hedef Açıklaması</h3>
          <textarea
            value={data.goalDescription}
            onChange={(e) => updateData('goalDescription', e.target.value)}
            placeholder="Örn: 6 ayda veri analisti olmak istiyorum..."
            maxLength={150}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
            rows={3}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {data.goalDescription.length}/150
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="text-center animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Artık hazırsın ✨
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Seçimlerine göre sana uygun mentorları hazırladık.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Profilin Özeti</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Seçimleriniz</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Kategori:</strong> {data.category}</p>
              <p><strong>Hedef:</strong> {data.goalLevel}</p>
              <p><strong>Bütçe:</strong> {data.budget}</p>
              <p><strong>Zaman:</strong> {data.timeAvailability}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Eşleşme Durumu</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Uygun Mentör:</strong> {Math.floor(Math.random() * 15) + 8} kişi</p>
              <p><strong>Eşleşme Oranı:</strong> %{Math.floor(Math.random() * 20) + 75}</p>
              <p><strong>Ortalama Yanıt:</strong> 2-4 saat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">🎯 Sana Özel Eşleşmeler Hazır!</h3>
        <p className="text-blue-100">
          Profiline uygun mentörler bulundu. Hemen keşfetmeye başla!
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (currentStep === 5) {
      return renderFinalStep();
    }
    
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
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
        {currentStep <= totalSteps && renderProgressBar()}

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

          <div className="flex items-center space-x-4">
            {currentStep <= totalSteps && currentStep > 3 && (
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Atla
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={currentStep <= totalSteps && !isStepValid() && currentStep !== 4}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <span>
                {currentStep === 5 ? 'Mentor Önerilerini Gör' : 'Devam Et'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
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