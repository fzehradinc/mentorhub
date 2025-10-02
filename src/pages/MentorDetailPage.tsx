import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Globe, ExternalLink, Award, Users, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import RequestFormModal from '../components/RequestFormModal/RequestFormModal';
import { mockMentors, mockReviews } from '../data/mockData';
import { Mentor, Review, TimeSlot } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface MentorDetailPageProps {
  mentorId: string;
  onBack: () => void;
}

/**
 * Mentor detail page component showing full mentor profile
 * Props:
 * - mentorId: ID of the mentor to display
 * - onBack: Function to navigate back to mentor list
 */
const MentorDetailPage: React.FC<MentorDetailPageProps> = ({ mentorId, onBack }) => {
  const { user } = useAuth();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  
  const mentor = mockMentors.find(m => m.id === mentorId);
  const mentorReviews = mockReviews.filter(r => r.mentorId === mentorId);

  if (!mentor) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentor Not Found</h1>
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to mentors
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleRequestSubmit = async (data: {
    mentorId: string;
    selectedSlot: TimeSlot;
    message: string;
    goals: string;
  }) => {
    // In a real app, this would send the request to the API
    console.log('Session request submitted:', data);
    alert('Request sent successfully! The mentor will respond within 24 hours.');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-amber-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Layout onShowAppointments={() => {}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to mentors</span>
        </button>

        {/* Mentor Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar and Basic Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={mentor.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                {mentor.isVerified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {mentor.name}
                  </h1>
                  <p className="text-xl text-blue-600 font-medium mb-3">
                    {mentor.title}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{mentor.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{mentor.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {renderStars(mentor.rating)}
                      <span className="font-semibold text-gray-900">
                        {mentor.rating}
                      </span>
                      <span className="text-gray-500">
                        ({mentor.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-start lg:items-end space-y-3">
                  {mentor.hourlyRate && (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        ${mentor.hourlyRate}
                      </span>
                      <span className="text-gray-500">/hour</span>
                    </div>
                  )}
                  
                  {user && user.role === 'mentee' ? (
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Request Session
                    </button>
                  ) : !user ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Sign in to book a session</p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Sign In
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Switch to mentee account to book sessions
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {mentor.bio}
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Expertise Areas</h2>
              <div className="flex flex-wrap gap-3">
                {mentor.expertiseAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Key Achievements</span>
              </h2>
              <ul className="space-y-3">
                {mentor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Reviews ({mentorReviews.length})</span>
              </h2>
              <ReviewsList reviews={mentorReviews} showMenteeName={true} limit={5} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Sessions</span>
                  <span className="font-semibold text-gray-900">
                    {mentor.totalReviews + 23}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold text-gray-900">2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {Object.keys(mentor.socialLinks).length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
                <div className="space-y-3">
                  {mentor.socialLinks.linkedin && (
                    <a
                      href={mentor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {mentor.socialLinks.github && (
                    <a
                      href={mentor.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {mentor.socialLinks.website && (
                    <a
                      href={mentor.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {mentor.availableSlots.length} slots available this week
                </p>
                <p className="text-sm text-gray-600">
                  Typically responds within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <RequestFormModal
        mentor={mentor}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </Layout>
  );
};

export default MentorDetailPage;