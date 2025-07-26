import React, { useEffect } from 'react';
import { 
  X, 
  Eye, 
  EyeOff, 
  Layout, 
  Palette, 
  Monitor, 
  Smartphone,
  RotateCcw,
  Save,
  Settings
} from 'lucide-react';

interface CustomizationPanelProps {
  availableWidgets: string[];
  widgetVisibility: Record<string, boolean>;
  onToggleWidget: (widgetId: string) => void;
  onClose: () => void;
  theme: string;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  availableWidgets,
  widgetVisibility,
  onToggleWidget,
  onClose,
  theme
}) => {
  // ESC tuşu ile kapatma fonksiyonu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const widgetLabels = {
    welcome: 'Hoşgeldin Paneli',
    stats: 'KPI İstatistikleri',
    quickActions: 'Hızlı Erişim',
    notifications: 'Bildirimler',
    calendar: 'Takvim & Ajanda',
    patientFlow: 'Hasta Akışı',
    recentActivity: 'Son Aktiviteler',
    treatmentOverview: 'Tedavi Özeti',
    analytics: 'Analitik Grafikler',
    performance: 'Performans Metrikleri',
    help: 'Yardım & Destek'
  };

  const widgetDescriptions = {
    welcome: 'Kişiselleştirilmiş karşılama ve günlük özet',
    stats: 'Önemli KPI\'lar ve sayısal veriler',
    quickActions: 'Sık kullanılan işlemler için hızlı butonlar',
    notifications: 'Sistem bildirimleri ve uyarılar',
    calendar: 'Randevular ve takvim görünümü',
    patientFlow: 'Hasta süreç akışı ve aşamalar',
    recentActivity: 'Son yapılan işlemler ve aktiviteler',
    treatmentOverview: 'Tedavi kategorileri ve özet bilgiler',
    analytics: 'Grafikler ve analitik veriler',
    performance: 'Kişisel performans metrikleri',
    help: 'Yardım, destek ve eğitim kaynakları'
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[85vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Dashboard Özelleştirme</h2>
                <div className="text-blue-100 text-sm">Widget görünürlüğü ve düzen</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="space-y-6">
            {/* Widget Visibility */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <Layout className="h-5 w-5 text-purple-600" />
                <span>Widget Görünürlüğü</span>
              </h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Dashboard'da görmek istediğiniz widget'ları seçin. Değişiklikler anında uygulanır.
              </p>
              
              <div className="space-y-3">
                {availableWidgets.map((widgetId) => (
                  <div
                    key={widgetId}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-700 bg-gray-750' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          widgetVisibility[widgetId] 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {widgetVisibility[widgetId] ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{widgetLabels[widgetId]}</h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {widgetDescriptions[widgetId]}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onToggleWidget(widgetId)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        widgetVisibility[widgetId] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          widgetVisibility[widgetId] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-blue-600" />
                <span>Layout Seçenekleri</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:border-blue-500 bg-gray-750' 
                    : 'border-gray-200 hover:border-blue-500 bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Desktop Layout</span>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Çoklu sütun grid düzeni
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:border-blue-500 bg-gray-750' 
                    : 'border-gray-200 hover:border-blue-500 bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Mobile Layout</span>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tek sütun dikey düzen
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <Palette className="h-5 w-5 text-green-600" />
                <span>Hızlı İşlemler</span>
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="h-4 w-4" />
                  <span>Ayarları Kaydet</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <RotateCcw className="h-4 w-4" />
                  <span>Varsayılana Dön</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Değişiklikler otomatik olarak kaydedilir
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;