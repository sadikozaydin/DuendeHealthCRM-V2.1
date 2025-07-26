import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import DashboardStats from '../components/dashboard/DashboardStats';
import PatientFlow from '../components/dashboard/PatientFlow';
import RecentActivity from '../components/dashboard/RecentActivity';
import TreatmentOverview from '../components/dashboard/TreatmentOverview';
import WelcomePanel from '../components/dashboard/WelcomePanel';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationCenter from '../components/dashboard/NotificationCenter';
import AnalyticsWidgets from '../components/dashboard/AnalyticsWidgets';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import HelpSupport from '../components/dashboard/HelpSupport';
import CustomizationPanel from '../components/dashboard/CustomizationPanel';
import { 
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  const [showCustomization, setShowCustomization] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [isMobileView, setIsMobileView] = useState(false);

  // Widget görünürlük durumları (kullanıcı tercihleri)
  const [widgetVisibility, setWidgetVisibility] = useState({
    welcome: true,
    stats: true,
    quickActions: true,
    notifications: true,
    calendar: true,
    patientFlow: true,
    recentActivity: true,
    treatmentOverview: true,
    analytics: true,
    performance: true,
    help: true
  });

  // Rol bazlı widget konfigürasyonu
  const getRoleBasedWidgets = () => {
    const roleWidgets = {
      super_admin: ['welcome', 'stats', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity', 'treatmentOverview', 'analytics', 'performance', 'help'],
      admin: ['welcome', 'stats', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity', 'treatmentOverview', 'analytics', 'performance'],
      manager: ['welcome', 'stats', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity', 'treatmentOverview', 'performance'],
      doctor: ['welcome', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity', 'help'],
      nurse: ['welcome', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity'],
      agent: ['welcome', 'stats', 'quickActions', 'notifications', 'performance'],
      coordinator: ['welcome', 'quickActions', 'notifications', 'calendar', 'recentActivity'],
      finance: ['welcome', 'stats', 'analytics', 'notifications'],
      partner: ['welcome', 'stats', 'performance', 'help'],
      patient: ['welcome', 'calendar', 'notifications', 'help']
    };

    return roleWidgets[user?.role] || ['welcome'];
  };

  // Ekran boyutu kontrolü
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Widget görünürlüğünü toggle etme
  const toggleWidget = (widgetId: string) => {
    setWidgetVisibility(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };

  // Dashboard'u sıfırlama
  const resetDashboard = () => {
    const roleWidgets = getRoleBasedWidgets();
    const resetVisibility = {};
    roleWidgets.forEach(widget => {
      resetVisibility[widget] = true;
    });
    setWidgetVisibility(resetVisibility);
    setDashboardLayout('default');
  };

  // Widget render fonksiyonu
  const renderWidget = (widgetId: string, className: string = '') => {
    if (!widgetVisibility[widgetId]) return null;

    const baseClass = `${className} bg-white`;

    switch (widgetId) {
      case 'welcome':
        return <WelcomePanel key={widgetId} className={baseClass} />;
      case 'stats':
        return <DashboardStats key={widgetId} className={baseClass} />;
      case 'quickActions':
        return <QuickActions key={widgetId} className={baseClass} />;
      case 'notifications':
        return <NotificationCenter key={widgetId} className={baseClass} />;
      case 'calendar':
        return <CalendarWidget key={widgetId} className={baseClass} />;
      case 'patientFlow':
        return <PatientFlow key={widgetId} className={baseClass} />;
      case 'recentActivity':
        return <RecentActivity key={widgetId} className={baseClass} />;
      case 'treatmentOverview':
        return <TreatmentOverview key={widgetId} className={baseClass} />;
      case 'analytics':
        return <AnalyticsWidgets key={widgetId} className={baseClass} />;
      case 'performance':
        return <PerformanceMetrics key={widgetId} className={baseClass} />;
      case 'help':
        return <HelpSupport key={widgetId} className={baseClass} />;
      default:
        return null;
    }
  };

  const availableWidgets = getRoleBasedWidgets();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Özelleştirme Paneli */}
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className={`p-2 rounded-lg transition-colors ${showCustomization ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="Dashboard'u Özelleştir"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Özelleştirme Paneli */}
      {showCustomization && (
        <CustomizationPanel
          availableWidgets={availableWidgets}
          widgetVisibility={widgetVisibility}
          onToggleWidget={toggleWidget}
          onClose={() => setShowCustomization(false)}
          theme="light"
        />
      )}

      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Welcome Panel - Her zaman en üstte */}
        {renderWidget('welcome')}

        {/* Layout: Mobile vs Desktop */}
        {isMobileView ? (
          // Mobil Layout - Tek sütun
          <div className="space-y-6">
            {renderWidget('stats')}
            {renderWidget('quickActions')}
            {renderWidget('notifications')}
            {renderWidget('calendar')}
            {renderWidget('patientFlow')}
            {renderWidget('recentActivity')}
            {renderWidget('treatmentOverview')}
            {renderWidget('analytics')}
            {renderWidget('performance')}
            {renderWidget('help')}
          </div>
        ) : (
          // Desktop Layout - Grid sistem
          <>
            {/* İlk Satır: Stats ve Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderWidget('stats')}
              </div>
              <div>
                {renderWidget('quickActions')}
              </div>
            </div>

            {/* İkinci Satır: Notifications ve Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderWidget('notifications')}
              {renderWidget('calendar')}
            </div>

            {/* Üçüncü Satır: Patient Flow ve Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderWidget('patientFlow')}
              {renderWidget('analytics')}
            </div>

            {/* Dördüncü Satır: Recent Activity ve Treatment Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderWidget('recentActivity')}
              {renderWidget('treatmentOverview')}
            </div>

            {/* Beşinci Satır: Performance ve Help */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderWidget('performance')}
              {renderWidget('help')}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;