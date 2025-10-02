import React from 'react';
import { Star, MapPin, Clock, ExternalLink, Users, Award } from 'lucide-react';
import { Mentor } from '../../types';

interface MentorCardProps {
  mentor: Mentor;
  onViewProfile: (mentorId: string) => void;
}

/**
 * ADPList-style mentor card component displaying mentor information
 * Props:
 * - mentor: Mentor object with all mentor details
 * - onViewProfile: Function called when "View Profile" is clicked, receives mentorId
 */
const MentorCard: React.FC<MentorCardProps> = ({ mentor, onViewProfile }) => {
  const formatPrice = (price: number) => {
    return `₺${price}`;
  };

  const getStatusBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Available ASAP':
        return 'bg-green-500 text-white';
      case 'Top rated':
        return 'bg-yellow-500 text-white';
      case 'Advance':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: Record<string, string> = {
      'tr': '🇹🇷',
      'us': '🇺🇸',
      'uk': '🇬🇧',
      'de': '🇩🇪',
      'fr': '🇫🇷'
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Photo Section with Status Badge */}
      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={mentor.imageUrl || mentor.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
            alt={mentor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyle(mentor.statusBadge)}`}>
            {mentor.statusBadge}
          </span>
        </div>

        {/* Verified Badge */}
        {mentor.isVerified && (
          <div className="absolute top-3 right-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Country */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {mentor.name}
          </h3>
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getCountryFlag(mentor.countryCode)}</span>
            <span className="text-xs text-gray-500 uppercase">{mentor.countryCode}</span>
          </div>
        </div>

        {/* Title and Company */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-blue-600 mb-1">
            {mentor.title}
          </p>
          <p className="text-sm text-gray-600 italic">
            {mentor.company}
          </p>
        </div>

        {/* Sessions and Reviews */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{mentor.sessions} sessions</span>
            <span className="text-gray-500"> ({mentor.totalReviews} reviews)</span>
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <Award className="w-3 h-3 text-gray-600" />
            </div>
            <p className="text-xs text-gray-600">Experience</p>
            <p className="text-sm font-semibold text-gray-900">{mentor.experienceYears} years</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-3 h-3 text-gray-600" />
            </div>
            <p className="text-xs text-gray-600">Avg. Attendance</p>
            <p className="text-sm font-semibold text-gray-900">{mentor.attendance}%</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-3 h-3 text-amber-500" />
            </div>
            <p className="text-xs text-gray-600">Rating</p>
            <p className="text-sm font-semibold text-gray-900">{mentor.rating}</p>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {mentor.expertiseAreas.slice(0, 2).map((area) => (
              <span
                key={area}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
              >
                {area}
              </span>
            ))}
            {mentor.expertiseAreas.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{mentor.expertiseAreas.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="space-y-3">
          {mentor.hourlyRate && (
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(mentor.hourlyRate)}
              </span>
              <span className="text-sm text-gray-500">/saat</span>
            </div>
          )}
          
          <button
            onClick={() => onViewProfile(mentor.id)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Profil Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;