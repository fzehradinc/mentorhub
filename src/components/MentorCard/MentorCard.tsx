import React from 'react';
import { Star, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Mentor } from '../../types';

interface MentorCardProps {
  mentor: Mentor;
  onViewProfile: (mentorId: string) => void;
}

/**
 * Mentor card component displaying mentor information
 * Props:
 * - mentor: Mentor object with all mentor details
 * - onViewProfile: Function called when "View Profile" is clicked, receives mentorId
 */
const MentorCard: React.FC<MentorCardProps> = ({ mentor, onViewProfile }) => {
  const formatPrice = (price: number) => {
    return `₺${price}`;
  };

  const getAvailabilityStatus = () => {
    if (mentor.available) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
          Müsait
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
          Meşgul
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header with avatar and basic info */}
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={mentor.imageUrl || mentor.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80`}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {mentor.isVerified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {mentor.name}
              </h3>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {mentor.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({mentor.totalReviews})
                </span>
              </div>
            </div>
            
            <p className="text-sm text-blue-600 font-medium mt-1">
              {mentor.title}
            </p>
            
            <p className="text-sm text-gray-600 mt-1">
              {mentor.company}
            </p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{mentor.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{mentor.experience}+ years</span>
              </div>
              {getAvailabilityStatus()}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {mentor.bio}
        </p>
      </div>

      {/* Areas */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {mentor.areas.slice(0, 3).map((area) => (
            <span
              key={area}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
            >
              {area}
            </span>
          ))}
          {mentor.areas.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{mentor.areas.length - 3} daha
            </span>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="px-6 pb-4">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Diller:</span>
          <span>{mentor.languages.join(', ')}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4 space-y-3">
        {/* Education Tags */}
        {mentor.tags.education.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">📘</span>
            {mentor.tags.education.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-900 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Degree Tags */}
        {mentor.tags.degree.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">🎓</span>
            {mentor.tags.degree.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Company Tags */}
        {mentor.tags.company.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">🏢</span>
            {mentor.tags.company.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Field Tags */}
        {mentor.tags.field.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">📚</span>
            {mentor.tags.field.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-orange-600 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Goal Tags */}
        {mentor.tags.goal.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">🎯</span>
            {mentor.tags.goal.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Footer with price and action */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {mentor.hourlyRate && (
              <span className="text-gray-900 font-semibold">
                {formatPrice(mentor.hourlyRate)}/saat
              </span>
            )}
          </div>
          
          <button
            onClick={() => onViewProfile(mentor.id)}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors group-hover:shadow-md ${
              mentor.available 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!mentor.available}
          >
            <span>{mentor.available ? 'Profili Görüntüle' : 'Müsait Değil'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;