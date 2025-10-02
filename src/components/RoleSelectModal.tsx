import React, { useEffect, useRef } from 'react';
import { X, User, GraduationCap, ArrowRight } from 'lucide-react';
import RoleCard from './RoleCard';
import { useRole } from '../hooks/useRole';

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Role selection modal for onboarding flow
 * Props:
 * - isOpen: Boolean indicating if modal is open
 * - onClose: Function to close the modal
 */
const RoleSelectModal: React.FC<RoleSelectModalProps> = ({ isOpen, onClose }) => {
  const { setRole } = useRole();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the modal
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 150);
    } else {
      // Unlock body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRoleSelect = (role: 'mentor' | 'mentee', href: string) => {
    // Save role to localStorage
    setRole(role);
    
    // Navigate to onboarding
    window.location.href = href;
  };

  const handleExploreClick = () => {
    onClose();
    window.location.href = '/mentorler';
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-select-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 id="role-select-title" className="text-2xl font-bold text-gray-900">
              Nasıl başlamak istersin?
            </h2>
            <p className="text-gray-600 mt-1">
              Sana en uygun deneyimi sunabilmemiz için rolünü seç
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            aria-label="Modalı kapat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Role Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RoleCard
              icon={<User className="w-8 h-8" />}
              title="Mentee olarak başla"
              description="Doğru mentörü bul, 1:1 görüşme planla, ilerlemeni takip et. Kariyerinde bir sonraki seviyeye çık."
              ctaLabel="Mentee Onboarding'e Git"
              href="/onboarding?role=mentee"
              roleValue="mentee"
              onClick={handleRoleSelect}
            />
            
            <RoleCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Mentor olarak başla"
              description="Uzmanlığınla etki yarat, profilini yayınla, randevu al. Deneyimini paylaşarak başkalarına ilham ver."
              ctaLabel="Mentor Başvurusu"
              href="/onboarding?role=mentor"
              roleValue="mentor"
              onClick={handleRoleSelect}
            />
          </div>

          {/* Alternative Action */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600 mb-4">
              Henüz karar veremedin mi?
            </p>
            <button
              onClick={handleExploreClick}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <span>Önce mentörleri keşfet</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 150ms ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 150ms ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RoleSelectModal;