import React from 'react';
import { Eye, Edit, MessageCircle, FileText } from 'lucide-react';
import { useBranch } from '../../contexts/BranchContext';

interface PatientListProps {
  filters: {
    status: string;
    treatment: string;
    country: string;
  };
}

const PatientList: React.FC<PatientListProps> = ({ filters }) => {
  const { currentBranch, branchSettings } = useBranch();

  const patients = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      age: 45,
      country: 'İspanya',
      treatment: 'Kalp Cerrahisi',
      status: 'Tedavide',
      coordinator: 'Dr. Mehmet',
      nextAppointment: '2025-01-15',
      priority: 'Yüksek',
      image: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150',
      branchId: '1'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      age: 52,
      country: 'UAE',
      treatment: 'Ortopedik Cerrahi',
      status: 'Planlama',
      coordinator: 'Dr. Fatma',
      nextAppointment: '2025-01-18',
      priority: 'Orta',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=150',
      branchId: '1'
    },
    {
      id: 3,
      name: 'Sarah Thompson',
      age: 38,
      country: 'İngiltere',
      treatment: 'Plastik Cerrahi',
      status: 'Konsültasyon',
      coordinator: 'Dr. Ayşe',
      nextAppointment: '2025-01-20',
      priority: 'Düşük',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
      branchId: '1'
    }
  ];

  // Şube filtrelemesi
  const filteredPatients = branchSettings.isMultiBranch && currentBranch
    ? patients.filter(patient => patient.branchId === currentBranch.id)
    : patients;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tedavide':
        return 'bg-green-100 text-green-800';
      case 'Planlama':
        return 'bg-yellow-100 text-yellow-800';
      case 'Konsültasyon':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek':
        return 'bg-red-100 text-red-800';
      case 'Orta':
        return 'bg-orange-100 text-orange-800';
      case 'Düşük':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hasta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tedavi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öncelik
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Koordinatör
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sonraki Randevu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={patient.image}
                      alt={patient.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age} years • {patient.country}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.treatment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.coordinator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.nextAppointment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-700 p-1 rounded">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;