import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

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
      
      // Navigate to mentee page after completion
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('showMenteePage'));
      }, 1000);
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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Adım {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          %{Math.round(getProgressPercentage())} tamamlandı
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <p className="text-center text-lg text-blue-700 font-medium italic">
        "{motivationalQuotes[currentStep - 1]}"
      </p>
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ne için destek istiyorsun?
        </h2>
        <p className="text-lg text-gray-600">
          Sana en uygun mentörü bulabilmemiz için alanını seç
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[
          { key: 'borsa', label: 'Borsa & Yatırım', icon: '📈', desc: 'Yatırım stratejileri ve finansal planlama' },
          { key: 'kariyer', label: 'Kariyer / İş', icon: '💼', desc: 'Kariyer gelişimi ve iş hayatı' },
          { key: 'universite', label: 'Üniversite & Eğitim', icon: '🎓', desc: 'Akademik başarı ve eğitim yolculuğu' },
          { key: 'kisisel', label: 'Kişisel Gelişim', icon: '🌟', desc: 'Kendini geliştirme ve yaşam koçluğu' },
          { key: 'hayat', label: 'Hayat Değişimi', icon: '🔄', desc: 'Büyük yaşam değişiklikleri ve dönüşüm' }
        ].map((category) => (
          <button
            key={category.key}
            onClick={() => updateData('category', category.key)}
            className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left relative overflow-hidden ${
              data.category === category.key
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="flex items-start space-x-4">
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <div className="flex-1">
                <div className="font-bold text-xl mb-2">{category.label}</div>
                <div className="text-sm text-gray-600">{category.desc}</div>
              </div>
              {data.category === category.key && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Hedefin hangisine daha yakın?
        </h2>
        <p className="text-lg text-gray-600">
          Bu sayede sana uygun deneyim seviyesindeki mentörlerle eşleştirebiliriz
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {[
          { 
            key: 'temel', 
            label: 'Temel Bilgi', 
            desc: 'Konuya yeni başlıyorum, temel bilgileri öğrenmek istiyorum',
            icon: '📚'
          },
          { 
            key: 'stratejik', 
            label: 'Stratejik Yol Haritası', 
            desc: 'Genel bir plan ve yönlendirme arıyorum',
            icon: '🗺️'
          },
          { 
            key: 'somut', 
            label: 'Somut Hedef', 
            desc: 'Belirli bir hedefe ulaşmak için rehberlik istiyorum',
            icon: '🎯'
          },
          { 
            key: 'uzun', 
            label: 'Uzun Süreli Koçluk', 
            desc: 'Sürekli destek ve gelişim için mentor arıyorum',
            icon: '🤝'
          }
        ].map((goal) => (
          <button
            key={goal.key}
            onClick={() => updateData('goalLevel', goal.key)}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-102 hover:shadow-md text-left group ${
              data.goalLevel === goal.key
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-102'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {goal.icon}
                </span>
                <div>
                  <div className="font-bold text-lg mb-1">{goal.label}</div>
                  <div className="text-sm text-gray-600">{goal.desc}</div>
                </div>
              </div>
              {data.goalLevel === goal.key && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Seans başı bütçe aralığın ve müsait zamanın nedir?
        </h2>
        <p className="text-lg text-gray-600">
          Bu bilgiler sayesinde uygun mentörlerle eşleştirebiliriz
        </p>
      </div>

      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Budget Selection */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">💰 Bütçe Aralığı</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: '500-1000', label: '500-1000 TL', desc: 'Uygun fiyat', color: 'green' },
              { key: '1000-2000', label: '1000-2000 TL', desc: 'Orta segment', color: 'blue' },
              { key: '2000+', label: '2000+ TL', desc: 'Premium', color: 'purple' }
            ].map((budget) => (
              <button
                key={budget.key}
                onClick={() => updateData('budget', budget.key)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  data.budget === budget.key
                    ? `border-${budget.color}-500 bg-${budget.color}-50 text-${budget.color}-700 shadow-lg scale-105`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg mb-2">{budget.label}</div>
                  <div className="text-sm text-gray-600">{budget.desc}</div>
                  {data.budget === budget.key && (
                    <div className="mt-3 flex justify-center">
                      <div className={`w-6 h-6 bg-${budget.color}-600 rounded-full flex items-center justify-center`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Availability */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">⏰ Müsait Zamanın</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'hafta-ici', label: 'Hafta içi akşam', desc: '18:00-22:00', icon: '🌆' },
              { key: 'hafta-sonu', label: 'Hafta sonu', desc: 'Cumartesi-Pazar', icon: '🌅' },
              { key: 'esnek', label: 'Esnek', desc: 'Her zaman uygun', icon: '⏰' }
            ].map((time) => (
              <button
                key={time.key}
                onClick={() => updateData('timeAvailability', time.key)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  data.timeAvailability === time.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{time.icon}</div>
                  <div className="font-bold text-lg mb-2">{time.label}</div>
                  <div className="text-sm text-gray-600">{time.desc}</div>
                  {data.timeAvailability === time.key && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Daha fazla bilgi vermek ister misin?
        </h2>
        <p className="text-lg text-gray-600">
          Bu adım opsiyonel - daha kişiselleştirilmiş öneriler için
        </p>
      </div>

      <div className="space-y-10 max-w-4xl mx-auto">
        {/* Mentor Type */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">🎓 Tercih Ettiğin Mentor Tipi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'akademik', label: 'Akademik', desc: 'Üniversite, araştırma', icon: '🎓' },
              { key: 'practitioner', label: 'Practitioner', desc: 'Sektör deneyimi', icon: '💼' },
              { key: 'koc', label: 'Koç', desc: 'Kişisel gelişim odaklı', icon: '🧭' }
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => updateData('mentorType', type.key)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  data.mentorType === type.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-bold text-lg mb-2">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.desc}</div>
                  {data.mentorType === type.key && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Goal Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">📝 Kısa Hedef Açıklaması</h3>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 focus-within:border-blue-500 transition-colors">
            <textarea
              value={data.goalDescription}
              onChange={(e) => updateData('goalDescription', e.target.value)}
              placeholder="Örn: 6 ayda veri analisti olmak istiyorum..."
              maxLength={150}
              className="w-full p-4 border-0 focus:outline-none resize-none text-lg"
              rows={4}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">İsteğe bağlı - Deneyiminizi paylaşın</span>
              <span className="text-sm text-gray-500">
                {data.goalDescription.length}/150
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="text-center animate-fade-in">
      <div className="mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✨</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Artık hazırsın!
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Seçimlerine göre sana uygun mentorları hazırladık.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Profilin Özeti</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
              Seçimleriniz
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Kategori:</strong> {data.category || 'Belirtilmedi'}</p>
              <p><strong>Hedef:</strong> {data.goalLevel || 'Belirtilmedi'}</p>
              <p><strong>Bütçe:</strong> {data.budget || 'Belirtilmedi'}</p>
              <p><strong>Zaman:</strong> {data.timeAvailability || 'Belirtilmedi'}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
              Eşleşme Durumu
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Uygun Mentör:</strong> {Math.floor(Math.random() * 15) + 8} kişi</p>
              <p><strong>Eşleşme Oranı:</strong> %{Math.floor(Math.random() * 20) + 75}</p>
              <p><strong>Ortalama Yanıt:</strong> 2-4 saat</p>
              <p><strong>Başarı Oranı:</strong> %{Math.floor(Math.random() * 10) + 85}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-3">🎯 Sana Özel Eşleşmeler Hazır!</h3>
        <p className="text-blue-100 text-lg">
          Profiline uygun mentörler bulundu. Hemen keşfetmeye başla!
        </p>
      </div>

      <div className="text-center text-lg text-blue-700 font-medium italic mb-8">
        "{motivationalQuotes[4]}"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Mentee Onboarding</h1>
          <p className="text-gray-600 mt-2">Sana uygun mentörü bulmak için birkaç soru</p>
        </div>

        {/* Progress Bar */}
        {currentStep <= totalSteps && renderProgressBar()}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 min-h-[600px] flex flex-col justify-center">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors rounded-xl hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentStep === 1 ? 'Çıkış' : 'Geri'}</span>
          </button>

          <div className="flex items-center space-x-4">
            {currentStep <= totalSteps && currentStep === 4 && (
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-white"
              >
                Atla
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={currentStep <= totalSteps && !isStepValid() && currentStep !== 4}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
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
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
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