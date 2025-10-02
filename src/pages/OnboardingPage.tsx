import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import OnboardingFlow from '../components/OnboardingFlow/OnboardingFlow';

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

interface OnboardingPageProps {
  onBack: () => void;
}

/**
 * Onboarding page for new mentees
 * Handles the complete 5-step onboarding flow
 */
const OnboardingPage: React.FC<OnboardingPageProps> = ({ onBack }) => {
  const [showFlow, setShowFlow] = useState(true);

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding completed with data:', data);
    
    // Save onboarding data to localStorage or send to API
    localStorage.setItem('mentee_onboarding_data', JSON.stringify(data));
    
    // Redirect to mentor suggestions or home page
    alert('Onboarding tamamlandı! Mentor önerilerine yönlendiriliyorsunuz...');
    onBack(); // This would typically navigate to mentor suggestions
  };

  const handleClose = () => {
    setShowFlow(false);
    onBack();
  };

  if (!showFlow) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ana sayfaya dön</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Onboarding İptal Edildi
            </h1>
            <p className="text-gray-600 mb-6">
              İstediğiniz zaman geri dönüp onboarding sürecini tamamlayabilirsiniz.
            </p>
            <button
              onClick={() => setShowFlow(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Onboarding'i Yeniden Başlat
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <OnboardingFlow
      onComplete={handleOnboardingComplete}
      onClose={handleClose}
    />
  );
};

export default OnboardingPage;