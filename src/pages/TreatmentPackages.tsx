import React from 'react';
import { Heart, DollarSign, Clock, Users } from 'lucide-react';

const TreatmentPackages = () => {
  const packages = [
    {
      id: 1,
      name: 'Cardiac Surgery Package',
      price: '$45,000',
      duration: '10-14 days',
      includes: ['Surgery', 'Hospital Stay', 'Recovery Care', 'Follow-up'],
      patients: 23,
      hospital: 'Istanbul Medical Center',
      category: 'Cardiology'
    },
    {
      id: 2,
      name: 'Knee Replacement Package',
      price: '$18,000',
      duration: '7-10 days',
      includes: ['Surgery', 'Physiotherapy', 'Accommodation', 'Transport'],
      patients: 31,
      hospital: 'Bangkok International Hospital',
      category: 'Orthopedics'
    },
    {
      id: 3,
      name: 'Dental Implant Package',
      price: '$8,500',
      duration: '5-7 days',
      includes: ['Consultation', 'Implant Surgery', 'Crown Fitting', 'Follow-up'],
      patients: 45,
      hospital: 'Dubai Healthcare City',
      category: 'Dental'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cardiology':
        return 'bg-red-100 text-red-800';
      case 'Orthopedics':
        return 'bg-blue-100 text-blue-800';
      case 'Dental':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Treatment Packages</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Create Package
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                  {pkg.category}
                </span>
              </div>
              <Heart className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="text-sm">Price</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">{pkg.price}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Duration</span>
                </div>
                <span className="text-sm text-gray-900">{pkg.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">Active Patients</span>
                </div>
                <span className="text-sm text-gray-900">{pkg.patients}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Includes</h4>
              <ul className="space-y-1">
                {pkg.includes.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Available at: {pkg.hospital}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm py-2 rounded-lg transition-colors">
                  Edit Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentPackages;