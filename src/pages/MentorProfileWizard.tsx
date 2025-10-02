import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import WizardLayout from '../components/mentor-wizard/WizardLayout';
import StepBasics from '../components/mentor-wizard/StepBasics';
import StepExpertise from '../components/mentor-wizard/StepExpertise';
import StepAvailability from '../components/mentor-wizard/StepAvailability';
import StepPricing from '../components/mentor-wizard/StepPricing';
import StepMediaBio from '../components/mentor-wizard/StepMediaBio';
import StepReviewPublish from '../components/mentor-wizard/StepReviewPublish';
import { useAutosave } from '../hooks/useAutosave';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface PricingPackage {
  id: string;
  name: string;
  sessions: number;
  discount: number;
}

interface MentorProfileData {
  // Step 1: Basics
  display_name: string;
  title: string;
  company_name: string;
  short_bio: string;
  languages: string[];
  location: string;
  timezone: string;
  
  // Step 2: Expertise
  primary_category: string;
  skills: string[];
  experience_years: number;
  highlight_offers: string[];
  
  // Step 3: Availability
  availability_pattern: string;
  time_slots: TimeSlot[];
  session_duration: number;
  meeting_pref: string;
  
  // Step 4: Pricing
  price_per_session: number;
  first_session_discount: boolean;
  discount_note: string;
  packages: PricingPackage[];
  
  // Step 5: Media/Bio
  avatar_upload: string;
  cover_upload: string;
  video_intro_url: string;
  long_bio: string;
}

interface MentorProfileWizardProps {
  onBack: () => void;
}

/**
 * Complete mentor profile wizard with 6 steps
 */
const MentorProfileWizard: React.FC<MentorProfileWizardProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [profileData, setProfileData] = useState<MentorProfileData>({
    // Step 1
    display_name: '',
    title: '',
    company_name: '',
    short_bio: '',
    languages: [],
    location: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // Step 2
    primary_category: '',
    skills: [],
    experience_years: 0,
    highlight_offers: [],
    
    // Step 3
    availability_pattern: '',
    time_slots: [],
    session_duration: 60,
    meeting_pref: '',
    
    // Step 4
    price_per_session: 0,
    first_session_discount: false,
    discount_note: '',
    packages: [],
    
    // Step 5
    avatar_upload: '',
    cover_upload: '',
    video_intro_url: '',
    long_bio: ''
  });

  const totalSteps = 6;

  // Autosave hook
  const { saveNow } = useAutosave(profileData, {
    delay: 800,
    onSave: async (data) => {
      // Mock API call - PATCH /mentors/{id}/draft
      console.log('Autosaving profile data:', data);
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onStatusChange: setAutosaveStatus
  });

  const updateProfileData = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Basics
        if (!profileData.display_name || profileData.display_name.length < 2) {
          newErrors.display_name = 'Görünecek isim en az 2 karakter olmalıdır';
        }
        if (!profileData.title || profileData.title.length < 2) {
          newErrors.title = 'Unvan en az 2 karakter olmalıdır';
        }
        if (!profileData.short_bio || profileData.short_bio.length < 80) {
          newErrors.short_bio = 'Kısa tanıtım en az 80 karakter olmalıdır';
        }
        if (profileData.languages.length === 0) {
          newErrors.languages = 'En az bir dil seçmelisiniz';
        }
        if (!profileData.location) {
          newErrors.location = 'Konum seçmelisiniz';
        }
        break;

      case 1: // Expertise
        if (!profileData.primary_category) {
          newErrors.primary_category = 'Ana kategori seçmelisiniz';
        }
        if (profileData.skills.length < 3) {
          newErrors.skills = 'En az 3 beceri seçmeniz önerilir';
        }
        if (profileData.experience_years === 0) {
          newErrors.experience_years = 'Deneyim yılı belirtmelisiniz';
        }
        break;

      case 2: // Availability
        if (!profileData.availability_pattern) {
          newErrors.availability_pattern = 'Müsaitlik durumu seçmelisiniz';
        }
        if (!profileData.meeting_pref) {
          newErrors.meeting_pref = 'Görüşme tercihi seçmelisiniz';
        }
        break;

      case 3: // Pricing
        if (profileData.price_per_session < 100) {
          newErrors.price_per_session = 'Minimum ücret 100₺ olmalıdır';
        }
        break;

      case 4: // Media/Bio
        if (!profileData.avatar_upload) {
          newErrors.avatar_upload = 'Profil fotoğrafı zorunludur';
        }
        if (profileData.long_bio.length < 400) {
          newErrors.long_bio = 'Detaylı tanıtım en az 400 karakter olmalıdır';
        }
        if (profileData.video_intro_url && !validateVideoUrl(profileData.video_intro_url)) {
          newErrors.video_intro_url = 'Geçerli bir YouTube veya Vimeo linki giriniz';
        }
        break;

      case 5: // Review/Publish
        // All validations from previous steps
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVideoUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSave = async () => {
    await saveNow();
  };

  const handlePreview = () => {
    console.log('Opening profile preview:', profileData);
    alert('Profil önizlemesi açılacak (Demo)');
  };

  const handlePublish = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsPublishing(true);
    
    try {
      // Mock API call - POST /mentors/{id}/publish
      console.log('Publishing mentor profile:', profileData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('🎉 Profiliniz başarıyla yayınlandı! Mentee\'ler artık sizi görebilir.');
      
      // Generate mock profile URL
      const profileSlug = profileData.display_name.toLowerCase().replace(/\s+/g, '-');
      console.log(`Profile URL: /mentors/${profileSlug}`);
      
      // Navigate back or to mentor dashboard
      onBack();
    } catch (error) {
      console.error('Publishing error:', error);
      alert('Yayınlama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsPublishing(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepBasics
            data={{
              display_name: profileData.display_name,
              title: profileData.title,
              company_name: profileData.company_name,
              short_bio: profileData.short_bio,
              languages: profileData.languages,
              location: profileData.location,
              timezone: profileData.timezone
            }}
            onChange={updateProfileData}
            errors={errors}
          />
        );
      case 1:
        return (
          <StepExpertise
            data={{
              primary_category: profileData.primary_category,
              skills: profileData.skills,
              experience_years: profileData.experience_years,
              highlight_offers: profileData.highlight_offers
            }}
            onChange={updateProfileData}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepAvailability
            data={{
              availability_pattern: profileData.availability_pattern,
              time_slots: profileData.time_slots,
              session_duration: profileData.session_duration,
              meeting_pref: profileData.meeting_pref
            }}
            onChange={updateProfileData}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepPricing
            data={{
              price_per_session: profileData.price_per_session,
              first_session_discount: profileData.first_session_discount,
              discount_note: profileData.discount_note,
              packages: profileData.packages
            }}
            onChange={updateProfileData}
            errors={errors}
          />
        );
      case 4:
        return (
          <StepMediaBio
            data={{
              avatar_upload: profileData.avatar_upload,
              cover_upload: profileData.cover_upload,
              video_intro_url: profileData.video_intro_url,
              long_bio: profileData.long_bio
            }}
            onChange={updateProfileData}
            errors={errors}
          />
        );
      case 5:
        return (
          <StepReviewPublish
            data={profileData}
            onChange={updateProfileData}
            errors={errors}
            onPreview={handlePreview}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onStepChange={handleStepChange}
      isStepValid={Object.keys(errors).length === 0}
      onSave={handleSave}
      onPreview={handlePreview}
      onPublish={handlePublish}
      isPublishing={isPublishing}
      autosaveStatus={autosaveStatus}
      onClose={onBack}
    >
      {renderCurrentStep()}
    </WizardLayout>
  );
};

export default MentorProfileWizard;