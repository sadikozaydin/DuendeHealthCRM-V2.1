import React from 'react';
import { Building2, MapPin, Star, Users } from 'lucide-react';

const Hospitals = () => {
  const hospitals = [
    {
      id: 1,
      name: 'Istanbul Medical Center',
      location: 'Istanbul, Turkey',
      specialties: ['Cardiology', 'Orthopedics', 'Oncology'],
      rating: 4.8,
      patients: 156,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bangkok International Hospital',
      location: 'Bangkok, Thailand',
      specialties: ['Plastic Surgery', 'Dental Care', 'Wellness'],
      rating: 4.9,
      patients: 203,
      image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Dubai Healthcare City',
      location: 'Dubai, UAE',
      specialties: ['Fertility', 'Cosmetic Surgery', 'Rehabilitation'],
      rating: 4.7,
      patients: 124,
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Partner Hospitals</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add Hospital
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {hospital.status}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{hospital.location}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-900">{hospital.rating}</span>
                <span className="text-sm text-gray-600 ml-2">
                  ({hospital.patients} patients)
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {hospital.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hospital.patients} active patients</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;