import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import MentorDetailPage from './pages/MentorDetailPage';
import AuthPage from './pages/AuthPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MessagesPage from './pages/MessagesPage';
import OnboardingPage from './pages/OnboardingPage';
import MenteePage from './pages/MenteePage';

type AppView = 'home' | 'mentor-detail' | 'auth' | 'appointments' | 'messages' | 'onboarding' | 'mentee-page';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedMentorId, setSelectedMentorId] = useState<string>('');

  // Listen for onboarding trigger from role selection
  React.useEffect(() => {
    const handleShowOnboarding = () => {
      setCurrentView('onboarding');
    };
    
    const handleShowMenteePage = () => {
      setCurrentView('mentee-page');
    };

    window.addEventListener('showOnboarding', handleShowOnboarding);
    window.addEventListener('showMenteePage', handleShowMenteePage);
    
    return () => {
      window.removeEventListener('showOnboarding', handleShowOnboarding);
      window.removeEventListener('showMenteePage', handleShowMenteePage);
    };
  }, []);

  const handleViewProfile = (mentorId: string) => {
    setSelectedMentorId(mentorId);
    setCurrentView('mentor-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMentorId('');
  };

  const handleAuthSuccess = () => {
    setCurrentView('home');
  };

  const handleShowAuth = () => {
    setCurrentView('auth');
  };

  const handleShowAppointments = () => {
    setCurrentView('appointments');
  };

  const handleShowMessages = () => {
    setCurrentView('messages');
  };

  const handleShowOnboarding = () => {
    setCurrentView('onboarding');
  };

  const handleShowMenteePage = () => {
    setCurrentView('mentee-page');
  };

  switch (currentView) {
    case 'mentor-detail':
      return (
        <MentorDetailPage
          mentorId={selectedMentorId}
          onBack={handleBackToHome}
        />
      );
    case 'auth':
      return <AuthPage onSuccess={handleAuthSuccess} />;
    case 'appointments':
      return <AppointmentsPage onBack={handleBackToHome} />;
    case 'messages':
      return <MessagesPage onBack={handleBackToHome} />;
    case 'onboarding':
      return <OnboardingPage onBack={handleBackToHome} />;
    case 'mentee-page':
      return <MenteePage onBack={handleBackToHome} />;
    default:
      return (
        <HomePage 
          onViewProfile={handleViewProfile}
          onShowAuth={handleShowAuth} 
          onShowAppointments={handleShowAppointments}
          onShowMessages={handleShowMessages}
          onShowOnboarding={handleShowOnboarding}
        />
      );
  }
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;