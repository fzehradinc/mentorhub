import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import MentorDetailPage from './pages/MentorDetailPage';
import AuthPage from './pages/AuthPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MessagesPage from './pages/MessagesPage';
import OnboardingPage from './pages/OnboardingPage';

type AppView = 'home' | 'mentor-detail' | 'auth' | 'appointments' | 'messages' | 'onboarding';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedMentorId, setSelectedMentorId] = useState<string>('');

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