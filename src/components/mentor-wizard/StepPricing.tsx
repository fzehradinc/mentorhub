import React from 'react';
import { DollarSign, Gift, Package } from 'lucide-react';
import FormField from './FormField';

interface PricingPackage {
  id: string;
  name: string;
  sessions: number;
  discount: number;
}

interface MentorPricing {
  price_per_session: number;
  first_session_discount: boolean;
  discount_note: string;
  packages: PricingPackage[];
}

interface StepPricingProps {
  data: MentorPricing;
  onChange: (field: keyof MentorPricing, value: number | boolean | string | PricingPackage[]) => void;
  errors: Record<string, string>;
}

/**
 * Step 4: Pricing and discount options
 */
const StepPricing: React.FC<StepPricingProps> = ({ data, onChange, errors }) => {
  const priceRanges = [
    { min: 100, max: 300, label: 'Başlangıç', desc: '100-300₺' },
    { min: 300, max: 600, label: 'Orta Seviye', desc: '300-600₺' },
    { min: 600, max: 1000, label: 'Deneyimli', desc: '600-1000₺' },
    { min: 1000, max: 5000, label: 'Premium', desc: '1000₺+' }
  ];

  const packageTemplates = [
    { name: '3 Seans Paketi', sessions: 3, discount: 10 },
    { name: '5 Seans Paketi', sessions: 5, discount: 15 },
    { name: '10 Seans Paketi', sessions: 10, discount: 20 }
  ];

  const handleAddPackage = (template: typeof packageTemplates[0]) => {
    const newPackage: PricingPackage = {
      id: Date.now().toString(),
      name: template.name,
      sessions: template.sessions,
      discount: template.discount
    };
    
    if (data.packages.length < 2) {
      onChange('packages', [...data.packages, newPackage]);
    }
  };

  const handleRemovePackage = (packageId: string) => {
    onChange('packages', data.packages.filter(pkg => pkg.id !== packageId));
  };

  const calculatePackagePrice = (pkg: PricingPackage) => {
    const totalPrice = data.price_per_session * pkg.sessions;
    const discountAmount = totalPrice * (pkg.discount / 100);
    return totalPrice - discountAmount;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ücret & İndirim
        </h2>
        <p className="text-gray-600">
          Mentörlük hizmetinizin fiyatlandırmasını belirleyin
        </p>
      </div>

      {/* Price Per Session */}
      <FormField
        label="Seans Başı Ücret"
        required
        error={errors.price_per_session}
        helper="Şeffaf fiyatlandırma güven verir. Minimum 100₺"
      >
        <div className="space-y-4">
          {/* Price Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              ₺
            </span>
            <input
              type="number"
              value={data.price_per_session || ''}
              onChange={(e) => onChange('price_per_session', parseInt(e.target.value) || 0)}
              placeholder="500"
              min={100}
              max={5000}
              className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-right ${
                errors.price_per_session ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>

          {/* Price Range Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Önerilen fiyat aralıkları:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => onChange('price_per_session', range.min)}
                  className="p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center"
                >
                  <div className="font-medium text-gray-900">{range.label}</div>
                  <div className="text-sm text-gray-600">{range.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </FormField>

      {/* First Session Discount */}
      <FormField
        label="İlk Seans İndirimi"
        helper="Yeni mentee'leri çekmek için ilk seans indirimi sunabilirsiniz"
      >
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.first_session_discount}
              onChange={(e) => onChange('first_session_discount', e.target.checked)}
              className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <div>
              <span className="font-medium text-gray-900">İlk seans indirimi sunmak istiyorum</span>
              <p className="text-sm text-gray-600">Yeni mentee'ler için özel fiyat</p>
            </div>
          </label>

          {data.first_session_discount && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <FormField
                label="İndirim Açıklaması"
                helper="Örn: 'İlk seans %50 indirimli' veya 'İlk seans 99₺'"
              >
                <input
                  type="text"
                  value={data.discount_note}
                  onChange={(e) => onChange('discount_note', e.target.value)}
                  placeholder="İlk seans %50 indirimli"
                  maxLength={50}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </FormField>
            </div>
          )}
        </div>
      </FormField>

      {/* Packages */}
      <FormField
        label="Seans Paketleri"
        helper="Mentee'lere paket seçenekleri sunabilirsiniz (maksimum 2 paket)"
      >
        <div className="space-y-4">
          {/* Package Templates */}
          {data.packages.length < 2 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Paket şablonları:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {packageTemplates.map((template) => (
                  <button
                    key={template.name}
                    type="button"
                    onClick={() => handleAddPackage(template)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                  >
                    <Package className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-600">%{template.discount} indirim</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Packages */}
          {data.packages.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Aktif paketler:</h4>
              {data.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div>
                    <h5 className="font-medium text-blue-900">{pkg.name}</h5>
                    <p className="text-sm text-blue-700">
                      {pkg.sessions} seans • %{pkg.discount} indirim
                    </p>
                    {data.price_per_session > 0 && (
                      <p className="text-sm text-blue-600">
                        <span className="line-through">{data.price_per_session * pkg.sessions}₺</span>
                        {' → '}
                        <span className="font-semibold">{calculatePackagePrice(pkg)}₺</span>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(pkg.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormField>

      {/* Pricing Summary */}
      {data.price_per_session > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Gift className="w-6 h-6 text-emerald-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fiyatlandırma Özeti</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Standart Seans:</strong> {data.price_per_session}₺</p>
                {data.first_session_discount && (
                  <p><strong>İlk Seans:</strong> {data.discount_note}</p>
                )}
                {data.packages.length > 0 && (
                  <p><strong>Paket Seçenekleri:</strong> {data.packages.length} adet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPricing;