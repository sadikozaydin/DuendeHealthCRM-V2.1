import React from 'react';
import { User, Users, Phone, Mail, MapPin, Calendar, Tag, FileText, Clock, Star } from 'lucide-react';

interface Lead {
  id: string;
  lead_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  treatment_interest?: string;
  source?: string;
  status: string;
  assigned_to?: string;
  budget_range?: string;
  notes?: string;
  tags?: string[];
  last_contact_date?: string;
  next_follow_up?: string;
  created_at: string;
  updated_at: string;
}

interface LeadDetailViewProps {
  lead: Lead;
  onAssign?: (leadId: string, userId: string) => void;
  onClose?: () => void;
}

export default function LeadDetailView({ lead, onAssign, onClose }: LeadDetailViewProps) {
  const handleAssignToSelf = () => {
    if (onAssign) {
      onAssign(lead.id, 'current-user-id'); // This should be the actual current user ID
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lead.first_name} {lead.last_name}
          </h2>
          <p className="text-sm text-gray-500">Lead ID: {lead.lead_id}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
          
          {lead.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{lead.email}</span>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{lead.phone}</span>
            </div>
          )}
          
          {(lead.city || lead.country) && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                {lead.city && lead.country ? `${lead.city}, ${lead.country}` : lead.city || lead.country}
              </span>
            </div>
          )}
        </div>

        {/* Lead Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lead Detayları</h3>
          
          {lead.treatment_interest && (
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{lead.treatment_interest}</span>
            </div>
          )}
          
          {lead.source && (
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{lead.source}</span>
            </div>
          )}
          
          {lead.budget_range && (
            <div className="flex items-center space-x-3">
              <Tag className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{lead.budget_range}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {lead.notes && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Notlar</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{lead.notes}</p>
        </div>
      )}

      {/* Tags */}
      {lead.tags && lead.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {lead.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Assignment Buttons */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atama İşlemleri</h3>
        <p className="text-gray-500 text-sm">Bu lead için atama işlemleri devre dışı bırakılmıştır.</p>
      </div>

      {/* Timestamps */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <div className="flex justify-between">
          <span>Oluşturulma: {new Date(lead.created_at).toLocaleDateString('tr-TR')}</span>
          <span>Güncelleme: {new Date(lead.updated_at).toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
    </div>
  );
}