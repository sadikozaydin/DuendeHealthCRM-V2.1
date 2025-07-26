import React from 'react';
import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
import { useBranch } from '../../contexts/BranchContext';
import { useAuth } from '../../contexts/AuthContext';
import RoleGuard from '../auth/RoleGuard';

const Header = () => {
  const { currentBranch, branches, setCurrentBranch, branchSettings } = useBranch();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-gray-200 text-gray-900 shadow-sm border-b px-6 py-4 fixed top-0 right-0 z-50 h-16 transition-all duration-300" style={{ left: 'var(--sidebar-width)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <RoleGuard roles={['super_admin', 'admin', 'manager']}>
            {branchSettings.isMultiBranch && (
              <select
                value={currentBranch?.id || ''}
                onChange={(e) => {
                  const branch = branches.find(b => b.id === e.target.value);
                  setCurrentBranch(branch || null);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">Şube Seçin</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            )}
          </RoleGuard>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Hasta, tedavi ara..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          
          <RoleGuard roles={['super_admin', 'admin']}>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </RoleGuard>
          
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
            <button 
              onClick={logout}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;