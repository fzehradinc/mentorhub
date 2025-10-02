import React, { useState, useMemo } from 'react';
import { Search, Filter, Heart, Sparkles } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import HeroBanner from '../components/HeroBanner';
import MentorCard from '../components/MentorCard/MentorCard';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import CategoryFilterBar from '../components/CategoryFilterBar/CategoryFilterBar';
import { useAuth } from '../contexts/AuthContext';
import { mockMentors } from '../data/mockData';
import { FilterOptions, Mentor, CategoryFilter } from '../types';

interface HomePageProps {
  onViewProfile: (mentorId: string) => void;
  onShowAuth: () => void;
  onShowAppointments: () => void;
  onShowMessages: () => void;
}

/**
 * Home page component displaying mentor discovery and filtering
 * Props:
 * - onViewProfile: Function to show mentor detail page
 * - onShowAuth: Function to show authentication page
 * - onShowAppointments: Function to show appointments page
 * - onShowMessages: Function to show messages page
 */
const HomePage: React.FC<HomePageProps> = ({ 
  onViewProfile, 
  onShowAuth, 
  onShowAppointments, 
  onShowMessages 
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [filters, setFilters] = useState<FilterOptions>({
    expertiseAreas: [],
    languages: [],
    minExperience: 0,
    maxExperience: 20,
    location: '',
    minRating: 0,
    priceRange: [0, 200]
  });

  // Calculate mentor counts for each category
  const mentorCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      'all': mockMentors.length,
      'new': mockMentors.filter(m => new Date(m.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
      'available-now': mockMentors.filter(m => m.statusBadge === 'Available ASAP').length,
      'academic': mockMentors.filter(m => m.title.toLowerCase().includes('dr') || m.title.toLowerCase().includes('prof')).length,
      'data-science-software': mockMentors.filter(m => 
        m.expertiseAreas.some(area => 
          area.toLowerCase().includes('veri') || 
          area.toLowerCase().includes('yazılım') || 
          area.toLowerCase().includes('software') ||
          area.toLowerCase().includes('data')
        )
      ).length,
      'female': mockMentors.filter(m => ['Fatma', 'Zeynep', 'Ayşe'].some(name => m.name.includes(name))).length,
      'entrepreneur': mockMentors.filter(m => 
        m.title.toLowerCase().includes('ceo') || 
        m.title.toLowerCase().includes('founder') || 
        m.title.toLowerCase().includes('girişimci')
      ).length,
      'international': mockMentors.filter(m => 
        m.achievements.some(achievement => 
          achievement.toLowerCase().includes('international') ||
          achievement.toLowerCase().includes('global') ||
          achievement.toLowerCase().includes('yurt dışı')
        )
      ).length
    };
    return counts;
  }, []);

  // Get personalized mentor recommendations based on user goals
  const personalizedMentors = useMemo(() => {
    if (!user || user.role !== 'mentee') {
      return [];
    }

    // Mock user goals for demo
    const userGoals = ['Kariyer Geçişi', 'Teknik Liderlik'];
    
    // Score mentors based on goal matching
    const scoredMentors = mockMentors.map(mentor => {
      const matchingGoals = mentor.expertiseAreas.filter(area => 
        userGoals.some(userGoal => 
          area.toLowerCase().includes(userGoal.toLowerCase()) ||
          userGoal.toLowerCase().includes(area.toLowerCase())
        )
      );
      
      return {
        mentor,
        score: matchingGoals.length,
        matchingGoals
      };
    });

    // Sort by score (highest first) and return top 3
    return scoredMentors
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.mentor);
  }, [user]);

  // Filter mentors based on search and filters
  const filteredMentors = useMemo(() => {
    let mentorsToFilter = mockMentors;
    
    // If user has personalized recommendations, prioritize them in the main list
    if (personalizedMentors.length > 0) {
      const personalizedIds = new Set(personalizedMentors.map(m => m.id));
      const nonPersonalized = mockMentors.filter(m => !personalizedIds.has(m.id));
      mentorsToFilter = [...personalizedMentors, ...nonPersonalized];
    }
    
    return mentorsToFilter.filter((mentor) => {
      // Category filter
      if (selectedCategory !== 'all') {
        switch (selectedCategory) {
          case 'new':
            if (new Date(mentor.createdAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) return false;
            break;
          case 'available-now':
            if (mentor.statusBadge !== 'Available ASAP') return false;
            break;
          case 'academic':
            if (!mentor.title.toLowerCase().includes('dr') && !mentor.title.toLowerCase().includes('prof')) return false;
            break;
          case 'data-science-software':
            if (!mentor.expertiseAreas.some(area => 
              area.toLowerCase().includes('veri') || 
              area.toLowerCase().includes('yazılım') || 
              area.toLowerCase().includes('software') ||
              area.toLowerCase().includes('data')
            )) return false;
            break;
          case 'female':
            // This would typically be a field in the database
            if (!['Fatma', 'Zeynep', 'Ayşe'].some(name => mentor.name.includes(name))) return false;
            break;
          case 'entrepreneur':
            if (!mentor.title.toLowerCase().includes('ceo') && 
                !mentor.title.toLowerCase().includes('founder') && 
                !mentor.title.toLowerCase().includes('girişimci')) return false;
            break;
          case 'international':
            if (!mentor.achievements.some(achievement => 
              achievement.toLowerCase().includes('international') ||
              achievement.toLowerCase().includes('global') ||
              achievement.toLowerCase().includes('yurt dışı')
            )) return false;
            break;
        }
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          mentor.name.toLowerCase().includes(query) ||
          mentor.title.toLowerCase().includes(query) ||
          mentor.bio?.toLowerCase().includes(query) ||
          mentor.expertiseAreas.some(area => area.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Expertise areas filter
      if (filters.expertiseAreas.length > 0) {
        const hasMatchingExpertise = filters.expertiseAreas.some(area =>
          mentor.expertiseAreas.includes(area)
        );
        if (!hasMatchingExpertise) return false;
      }

      // Languages filter
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = filters.languages.some(lang =>
          mentor.languages.includes(lang)
        );
        if (!hasMatchingLanguage) return false;
      }

      // Experience filter
      if (mentor.experience < filters.minExperience || mentor.experience > filters.maxExperience) {
        return false;
      }

      // Location filter
      if (filters.location && mentor.location !== filters.location) {
        return false;
      }

      // Rating filter
      if (mentor.rating < filters.minRating) {
        return false;
      }

      // Price range filter
      if (mentor.hourlyRate) {
        if (mentor.hourlyRate < filters.priceRange[0] || mentor.hourlyRate > filters.priceRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters, selectedCategory, personalizedMentors]);

  return (
    <Layout onShowAuth={onShowAuth} onShowAppointments={onShowAppointments} onShowMessages={onShowMessages}>
      {/* START: HeroBanner */}
      <HeroBanner />
      {/* END: HeroBanner */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Bar */}
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          mentorCounts={mentorCounts}
        />

        {/* Personalized Recommendations */}
        {personalizedMentors.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold text-gray-900">Sana Özel Eşleşmeler</h2>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            
            <p className="text-gray-600 mb-6">
              Hedeflerinle eşleşen mentörler özel olarak seçildi
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {personalizedMentors.map((mentor) => (
                <div key={mentor.id} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      Önerilen
                    </div>
                  </div>
                  <MentorCard
                    mentor={mentor}
                    onViewProfile={onViewProfile}
                  />
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tüm Mentörleri Keşfet
              </h3>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredMentors.length === 0 ? 'Mentör bulunamadı' : 
                   filteredMentors.length === 1 ? '1 mentör bulundu' :
                   `${filteredMentors.length} mentör bulundu`}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 mt-1">
                    "{searchQuery}" için sonuçlar
                  </p>
                )}
                {selectedCategory !== 'all' && (
                  <p className="text-blue-600 mt-1 text-sm">
                    Kategoriye göre filtrelendi
                  </p>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filtreler</span>
              </button>
            </div>

            {/* Mentors Grid */}
            {filteredMentors.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mentör bulunamadı
                </h3>
                <p className="text-gray-600 mb-6">
                  Daha fazla mentör bulmak için arama kriterlerinizi veya filtrelerinizi ayarlamayı deneyin.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilters({
                      expertiseAreas: [],
                      languages: [],
                      minExperience: 0,
                      maxExperience: 20,
                      location: '',
                      minRating: 0,
                      priceRange: [0, 1000]
                    });
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tüm Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onViewProfile={onViewProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;