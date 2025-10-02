import React, { useState } from 'react';
import { Award, Plus, X, Lightbulb } from 'lucide-react';
import FormField from './FormField';

interface MentorExpertise {
  primary_category: string;
  skills: string[];
  experience_years: number;
  highlight_offers: string[];
}

interface StepExpertiseProps {
  data: MentorExpertise;
  onChange: (field: keyof MentorExpertise, value: string | string[] | number) => void;
  errors: Record<string, string>;
}

/**
 * Step 2: Expertise and skills
 */
const StepExpertise: React.FC<StepExpertiseProps> = ({ data, onChange, errors }) => {
  const [customSkill, setCustomSkill] = useState('');

  const categories = [
    { key: 'urun', label: 'Ürün', icon: '📱', desc: 'Product Management, Strategy' },
    { key: 'tasarim', label: 'Tasarım', icon: '🎨', desc: 'UX/UI, Design Thinking' },
    { key: 'yazilim', label: 'Yazılım', icon: '💻', desc: 'Development, Engineering' },
    { key: 'veri', label: 'Veri/AI', icon: '📊', desc: 'Data Science, Machine Learning' },
    { key: 'pazarlama', label: 'Pazarlama', icon: '📈', desc: 'Marketing, Growth' },
    { key: 'liderlik', label: 'Liderlik', icon: '👥', desc: 'Management, Leadership' },
    { key: 'girisimcilik', label: 'Girişimcilik', icon: '🚀', desc: 'Startup, Business' }
  ];

  const skillSuggestions = [
    'UX Research', 'Product Strategy', 'React', 'Python', 'Data Analysis',
    'Digital Marketing', 'Team Leadership', 'Agile', 'Design Systems',
    'Machine Learning', 'Business Development', 'OKR', 'Fintech',
    'E-commerce', 'Mobile Development', 'Brand Strategy'
  ];

  const highlightOffers = [
    { key: 'cv-review', label: 'CV/Portföy Yorumu', icon: '📄' },
    { key: 'mock-interview', label: 'Mock Interview', icon: '🎤' },
    { key: 'career-roadmap', label: 'Kariyer Haritası', icon: '🗺️' },
    { key: 'technical-coaching', label: 'Teknik Koçluk', icon: '⚡' },
    { key: 'networking', label: 'Network Tanıtımı', icon: '🤝' },
    { key: 'goal-setting', label: 'Hedef Belirleme', icon: '🎯' }
  ];

  const handleSkillAdd = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onChange('skills', [...data.skills, skill]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    onChange('skills', data.skills.filter(skill => skill !== skillToRemove));
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
      handleSkillAdd(customSkill.trim());
      setCustomSkill('');
    }
  };

  const handleOfferToggle = (offer: string) => {
    const newOffers = data.highlight_offers.includes(offer)
      ? data.highlight_offers.filter(o => o !== offer)
      : [...data.highlight_offers, offer];
    onChange('highlight_offers', newOffers);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Uzmanlık & Etiketler
        </h2>
        <p className="text-gray-600">
          Hangi alanlarda mentörlük verebileceğinizi belirtin
        </p>
      </div>

      {/* Primary Category */}
      <FormField
        label="Ana Kategori"
        required
        error={errors.primary_category}
        helper="Mentörlük vereceğiniz ana alan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onChange('primary_category', category.key)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                data.primary_category === category.key
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 bg-white'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </FormField>

      {/* Skills */}
      <FormField
        label="Beceriler & Uzmanlık Alanları"
        required
        error={errors.skills}
        helper="Uzmanlığı netleştirmek, eşleşme kalitesini artırır. En az 3 beceri önerilir."
      >
        <div className="space-y-4">
          {/* Skill Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Önerilen beceriler:</p>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions
                .filter(skill => !data.skills.includes(skill))
                .slice(0, 12)
                .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillAdd(skill)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Skill Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Özel beceri ekle..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCustomSkillAdd();
                }
              }}
            />
            <button
              type="button"
              onClick={handleCustomSkillAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Selected Skills */}
          {data.skills.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-3">
                Seçili beceriler ({data.skills.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.skills.length < 3 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                ⚠️ En az 3 beceri seçmeniz önerilir. Bu, daha iyi eşleşmeler sağlar.
              </p>
            </div>
          )}
        </div>
      </FormField>

      {/* Experience Years */}
      <FormField
        label="Deneyim Yılı"
        required
        error={errors.experience_years}
        helper="Bu alandaki toplam deneyiminiz"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 1, label: '1-2 yıl' },
            { value: 3, label: '3-5 yıl' },
            { value: 6, label: '6-10 yıl' },
            { value: 11, label: '10+ yıl' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange('experience_years', option.value)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                data.experience_years === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <span className="font-semibold">{option.label}</span>
            </button>
          ))}
        </div>
      </FormField>

      {/* Highlight Offers */}
      <FormField
        label="Öne Çıkan Hizmetler"
        error={errors.highlight_offers}
        helper="Mentee'lere sunabileceğiniz özel hizmetler (opsiyonel)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlightOffers.map((offer) => (
            <button
              key={offer.key}
              type="button"
              onClick={() => handleOfferToggle(offer.key)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                data.highlight_offers.includes(offer.key)
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{offer.icon}</span>
                <span className="font-medium">{offer.label}</span>
              </div>
            </button>
          ))}
        </div>
      </FormField>

      {/* Expertise Summary */}
      {data.primary_category && data.skills.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-purple-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzmanlık Özeti</h3>
              <p className="text-sm text-gray-700">
                <strong>{categories.find(c => c.key === data.primary_category)?.label}</strong> alanında{' '}
                <strong>{data.experience_years}+ yıl</strong> deneyimli mentor olarak{' '}
                <strong>{data.skills.length} beceri</strong> alanında mentörlük verebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepExpertise;