import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserPlus, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Download, 
  Upload, 
  RefreshCw,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Flag,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Zap,
  Bot,
  Flame,
  Thermometer,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import { getLeads, getLeadStats, updateLead } from '../services/leadService';
import { getStatusColor, getStatusName, getPriorityColor, getPriorityName, getTemperatureColor, getTemperatureName } from '../utils/leadHelpers';
import LeadFilters from '../components/leads/LeadFilters';
import NewLeadModal from '../components/leads/NewLeadModal';
import LeadImportModal from '../components/leads/LeadImportModal';
import EditLeadModal from '../components/leads/EditLeadModal';
import LeadPreviewPopup from '../components/leads/LeadPreviewPopup';
import LeadNoteModal from '../components/leads/LeadNoteModal';
import MessageButton from '../components/common/MessageButton';

const LeadManagement: React.FC = () => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  
  // Tarih formatı fonksiyonu
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Geçerli bir tarih mi kontrol et
      if (isNaN(date.getTime())) {
        return 'Geçersiz Tarih';
      }
      return date.toLocaleDateString('tr-TR');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Geçersiz Tarih';
    }
  };
  
  // Örnek lead verileri
  const initialLeads = [
    {
      id: '1',
      lead_id: 'LEAD-123456',
      first_name: 'Maria',
      last_name: 'Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '+34 612 345 678',
      country: 'İspanya',
      city: 'Madrid',
      treatment_interest: 'Kalp Cerrahisi',
      source: 'whatsapp',
      status: 'contacted',
      assigned_to: '1',
      assigned_to_name: 'Fatma Yılmaz',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '€30,000 - €50,000',
      notes: 'Bypass ameliyatı için bilgi istiyor. Fiyat ve tedavi süreci hakkında detaylı bilgi verildi.',
      tags: ['high', 'Acil', 'VIP'],
      last_contact_date: '2025-01-14T14:30:00',
      next_follow_up: '2025-01-16T10:00:00',
      created_at: '2025-01-14T10:15:00',
      updated_at: '2025-01-14T14:30:00',
      language: 'İspanyolca',
      priority: 'high',
      campaign: 'Kardiyoloji 2025',
      lead_score: 85,
      lead_temperature: 'hot',
      conversion_probability: 75,
      interaction_count: 3,
      sourceDetails: 'WhatsApp Business API'
    },
    {
      id: '2',
      lead_id: 'LEAD-234567',
      first_name: 'Ahmed',
      last_name: 'Hassan',
      email: 'ahmed.hassan@example.com',
      phone: '+971 50 123 4567',
      country: 'BAE',
      city: 'Dubai',
      treatment_interest: 'Ortopedi',
      source: 'website',
      status: 'qualified',
      assigned_to: '2',
      assigned_to_name: 'Ahmet Kaya',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '$40,000 - $60,000',
      notes: 'Diz protezi ameliyatı için fiyat teklifi istedi. Detaylı bilgi e-posta ile gönderildi.',
      tags: ['medium'],
      last_contact_date: '2025-01-13T16:45:00',
      next_follow_up: '2025-01-17T11:30:00',
      created_at: '2025-01-10T09:20:00',
      updated_at: '2025-01-13T16:45:00',
      language: 'Arapça',
      priority: 'medium',
      campaign: 'Ortopedi 2025',
      lead_score: 72,
      lead_temperature: 'warm',
      conversion_probability: 65,
      interaction_count: 2,
      sourceDetails: 'Website Form'
    },
    {
      id: '3',
      lead_id: 'LEAD-345678',
      first_name: 'Sarah',
      last_name: 'Thompson',
      email: 'sarah.thompson@example.com',
      phone: '+44 7700 900123',
      country: 'İngiltere',
      city: 'Londra',
      treatment_interest: 'Plastik Cerrahi',
      source: 'instagram',
      status: 'contacted',
      assigned_to: '3',
      assigned_to_name: 'Zeynep Demir',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '£20,000 - £30,000',
      notes: 'Rinoplasti için bilgi istiyor. Instagram reklamı üzerinden geldi.',
      tags: ['low'],
      last_contact_date: '2025-01-12T11:20:00',
      next_follow_up: '2025-01-18T14:00:00',
      created_at: '2025-01-12T09:15:00',
      updated_at: '2025-01-12T11:20:00',
      language: 'İngilizce',
      priority: 'low',
      campaign: 'Instagram Beauty 2025',
      lead_score: 45,
      lead_temperature: 'warm',
      conversion_probability: 40,
      interaction_count: 1,
      sourceDetails: 'Instagram Beauty Campaign'
    }
  ];
  
  // State for leads and filters
  const [leads, setLeads] = useState<any[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    country: 'all',
    treatment: 'all',
    temperature: 'all',
    priority: 'all'
  });
  
  // State for modals and popups
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [showLeadPreview, setShowLeadPreview] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [leadStats, setLeadStats] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sayfa yüklendiğinde lead'leri getir
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        const result = await getLeads();
        if (result.data) {
          setLeads(result.data);
        } else {
          console.error('No leads data returned:', result.error);
          setLeads([]);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeads();
  }, []);
  
  // Yeni lead eklendiğinde dinle
  useEffect(() => {
    const handleNewLeadAdded = (event: CustomEvent) => {
      console.log('New lead added event received:', event.detail.lead);
      // Yeni lead'i ekle ve state'i güncelle
      const updatedLeads = [event.detail.lead, ...leads];
      setLeads(updatedLeads);
      
      // LocalStorage'a kaydet
      try {
        localStorage.setItem('crm_leads', JSON.stringify(updatedLeads));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    };
    
    window.addEventListener('newLeadAdded', handleNewLeadAdded as EventListener);
    
    return () => {
      window.removeEventListener('newLeadAdded', handleNewLeadAdded as EventListener);
    };
  }, [leads]);
  
  // Load lead stats on component mount
  useEffect(() => {
    const loadLeadStats = async () => {
      try {
        const result = await getLeadStats();
        if (result.data) {
          setLeadStats(result.data);
        }
      } catch (error) {
        console.error('Error loading lead stats:', error);
      }
    };
    
    loadLeadStats();
  }, [refreshTrigger]);
  
  // Filter leads based on search term and filters
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search term filter
      const matchesSearch = 
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.lead_id && lead.lead_id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Status filter
      const matchesStatus = filters.status === 'all' || lead.status === filters.status;
      
      // Source filter
      const matchesSource = filters.source === 'all' || 
        (lead.source && lead.source.toLowerCase() === filters.source.toLowerCase());
      
      // Country filter
      const matchesCountry = filters.country === 'all' || 
        (lead.country && lead.country.toLowerCase() === filters.country.toLowerCase());
      
      // Treatment filter
      const matchesTreatment = filters.treatment === 'all' || 
        (lead.treatment_interest && lead.treatment_interest.toLowerCase() === filters.treatment.toLowerCase());
      
      // Temperature filter
      const matchesTemperature = filters.temperature === 'all' || 
        (lead.lead_temperature && lead.lead_temperature === filters.temperature);
      
      // Priority filter
      const matchesPriority = filters.priority === 'all' || 
        (lead.priority && lead.priority === filters.priority);
      
      return matchesSearch && matchesStatus && matchesSource && 
             matchesCountry && matchesTreatment && matchesTemperature && matchesPriority;
    });
  }, [leads, searchTerm, filters]);
  
  // Handle lead edit
  const handleEditLead = (lead: any) => {
    console.log('Opening edit modal for lead:', lead);
    setSelectedLead(lead);
    setShowEditModal(true);
  };
  
  // Handle lead preview
  const handleLeadPreview = (lead: any) => {
    setSelectedLead(lead);
    setShowLeadPreview(true);
  };
  
  // Handle lead note
  const handleAddNote = (lead: any) => {
    setSelectedLead(lead);
    // Not modalını aç
    setShowNoteModal(true);
  };
  
  // Handle lead updated
  const handleLeadUpdated = () => {
    console.log('Lead updated, refreshing list...');
    
    // Güncel lead listesini localStorage'dan yeniden yükle
    try {
      const storedLeads = localStorage.getItem('crm_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (e) {
      console.error('Error reloading leads from localStorage:', e);
    }
    
    // Refresh trigger'ı güncelle
    setRefreshTrigger(prev => prev + 1); 
  };
  
  // Lead ekleme işlemi tamamlandığında
  const handleLeadAdded = () => {
    console.log('Lead added, refreshing list...');
    // Refresh trigger'ı da güncelle (API çağrıları için)
    setRefreshTrigger(prev => prev + 1);
    
    // Güncel lead listesini localStorage'dan yeniden yükle
    try {
      const storedLeads = localStorage.getItem('crm_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (e) {
      console.error('Error reloading leads from localStorage:', e);
    }
  };

  // Lead durumunu güncelleme
  const handleStatusChange = async (leadId: string, status: string) => {
    try {
      // Lead'i bul
      const leadToUpdate = leads.find(lead => lead.id === leadId);
      if (!leadToUpdate) return;
      
      // Lead'i güncelle
      const updatedLeadData = {
        ...leadToUpdate,
        status: status,
        updated_at: new Date().toISOString()
      };
      
      // API'yi çağır
      const result = await updateLead(leadId, updatedLeadData);
      
      if (result.success) {
        // Lead listesini güncelle
        handleLeadUpdated();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Yönetimi</h1>
          <p className="text-gray-600 mt-1">Potansiyel hasta yönetimi ve takibi</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>İçe Aktar</span>
          </button>
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Yeni Lead</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Lead</p>
              <p className="text-3xl font-bold text-blue-600">{leadStats?.totalCount || 247}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+{leadStats?.totalGrowth || 12}% bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dönüşüm Oranı</p>
              <p className="text-3xl font-bold text-green-600">%{leadStats?.conversionRate || 14}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+{leadStats?.conversionGrowth || 5}% artış</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sıcak Lead'ler</p>
              <p className="text-3xl font-bold text-red-600">{leadStats?.temperatureCounts?.find(t => t.temperature === 'hot')?.count || 78}</p>
            </div>
            <Flame className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">Yüksek dönüşüm potansiyeli</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Yanıt</p>
              <p className="text-3xl font-bold text-purple-600">{leadStats?.averageResponseTime || 2.3}sa</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">-%{leadStats?.responseImprovement || 15} iyileşme</p>
        </div>
      </div>

      {/* Filters */}
      <LeadFilters 
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        leadStats={leadStats}
      />

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Bilgileri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tedavi & Kaynak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum & Skor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atama & Takip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {lead.image ? (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                            lead.priority === 'high' ? 'bg-red-500 animate-pulse-fast' :
                            lead.priority === 'medium' ? 'bg-yellow-500 animate-pulse-medium' :
                            'bg-green-500 animate-pulse-slow'
                          }`}>
                            {(lead.first_name?.[0] || '?')}{(lead.last_name?.[0] || '?')}
                          </div>
                        ) : (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold animate-pulse ${
                            lead.priority === 'high' ? 'bg-red-500 animate-pulse-fast' :
                            lead.priority === 'medium' ? 'bg-yellow-500 animate-pulse-medium' :
                            'bg-green-500 animate-pulse-slow'
                          }`}>
                            {(lead.first_name?.[0] || '?')}{(lead.last_name?.[0] || '?')}
                          </div>
                        )}
                        {lead.priority === 'high' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 border-2 border-white rounded-full animate-pulse-border"></div>
                        )}
                        {lead.priority === 'medium' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 border-2 border-white rounded-full animate-pulse-border-medium"></div>
                        )}
                        {lead.priority === 'low' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full animate-pulse-border-slow"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.first_name || 'İsimsiz'} {lead.last_name || 'Lead'}</div>
                        <div className="text-xs text-gray-500">{lead.lead_id || `LEAD-${typeof lead.id === 'string' ? lead.id.slice(-6) : '000000'}`}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span>Eklenme: {lead.created_at ? new Date(lead.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.phone && (
                      <div className="flex items-center space-x-1 text-sm text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-[150px]">{lead.email}</span>
                      </div>
                    )}
                    {lead.country && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span>{lead.city ? `${lead.city}, ${lead.country}` : lead.country}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.treatment_interest}</div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span>{lead.source || 'Bilinmiyor'}</span>
                      {lead.sourceDetails && (
                        <span className="text-gray-400 truncate max-w-[100px]">({lead.sourceDetails})</span>
                      )}
                    </div>
                    {lead.language && (
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                          {lead.language || 'Bilinmiyor'}
                        </span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {getStatusName(lead.status || 'contacted') || 'İletişimde'}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                        {getPriorityName(lead.priority || 'medium') || 'Orta'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3 text-blue-600" />
                        <span>{typeof lead.lead_score === 'number' ? lead.lead_score : 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Thermometer className="h-3 w-3 text-red-600" />
                        <span className={`${lead.lead_temperature ? getTemperatureColor(lead.lead_temperature) : 'text-gray-600'}`}>
                          {getTemperatureName(lead.lead_temperature || 'warm') || 'Ilımlı'}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.assigned_to_name || 'Fatma Yılmaz'}</div>
                    <div className="text-xs text-gray-500">{lead.assigned_to_position || 'Satış Temsilcisi'}</div>
                    {lead.next_follow_up && (
                      <div className="flex items-center space-x-1 text-xs text-blue-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Takip: {formatDate(lead.next_follow_up)}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleLeadPreview(lead)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="text-gray-600 hover:text-gray-700 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleAddNote(lead)}
                        className="text-purple-600 hover:text-purple-700 p-1 rounded"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <MessageButton
                        recipientId={lead.id}
                        recipientType="lead"
                        contactInfo={{
                          phone: lead.phone,
                          email: lead.email,
                          whatsapp: lead.phone
                        }}
                        size="sm"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Destekli Lead Yönetimi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Lead Skorlama</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kaynak bazlı önceliklendirme</li>
              <li>• Tedavi türü analizi</li>
              <li>• Etkileşim geçmişi değerlendirmesi</li>
              <li>• Dönüşüm olasılığı hesaplama</li>
              <li>• Otomatik sıcaklık belirleme</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik Atama Sistemi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dil bazlı eşleştirme</li>
              <li>• Uzmanlık alanı eşleştirmesi</li>
              <li>• İş yükü dengeleme</li>
              <li>• Performans bazlı atama</li>
              <li>• Coğrafi bölge optimizasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Takip Otomasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik hatırlatıcılar</li>
              <li>• Çoklu kanal takibi</li>
              <li>• Yanıt süre analizi</li>
              <li>• Etkileşim önerileri</li>
              <li>• Dönüşüm tahminleri</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNewLeadModal && (
        <NewLeadModal 
          isOpen={showNewLeadModal} 
          onClose={() => setShowNewLeadModal(false)} 
          onLeadAdded={handleLeadAdded}
        />
      )}
      
      {showImportModal && (
        <LeadImportModal 
          isOpen={showImportModal} 
          onClose={() => setShowImportModal(false)} 
        />
      )}
      
      {showEditModal && selectedLead && (
        <EditLeadModal 
          isOpen={showEditModal} 
          onClose={() => {
            setShowEditModal(false);
            setSelectedLead(null);
          }} 
          lead={selectedLead}
          onLeadUpdated={handleLeadUpdated}
        />
      )}
      
      {showLeadPreview && selectedLead && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" 
          style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => {
            setShowLeadPreview(false);
            setSelectedLead(null);
          }}
        >
          <LeadPreviewPopup
            lead={selectedLead}
            onClose={() => {
              setShowLeadPreview(false);
              setSelectedLead(null);
            }}
            onAddNote={() => {
              setShowLeadPreview(false);
              setShowNoteModal(true);
            }}
          />
        </div>
      )}
      
      {showNoteModal && selectedLead && (
        <LeadNoteModal
          isOpen={showNoteModal}
          onClose={() => {
            setShowNoteModal(false);
          }}
          leadId={selectedLead.id}
          leadName={`${selectedLead.first_name} ${selectedLead.last_name}`}
          onNoteSaved={() => {
            setShowNoteModal(false);
            // Notlar listesini yenilemek için refresh trigger'ı güncelle
            setRefreshTrigger(prev => prev + 1);
          }}
        />
      )}
    </div>
  );
};

export default LeadManagement;