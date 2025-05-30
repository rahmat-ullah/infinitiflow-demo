import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import Dashboard from './Dashboard';
import ContentManager from './ContentManager';
import UserManager from './UserManager';
import SettingsPanel from './SettingsPanel';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { setAdminMode } = useAdminStore();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManager />;
      case 'users':
        return <UserManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-950">
      {/* Top Bar */}
      <div className="bg-white dark:bg-secondary-900 shadow-sm dark:shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setAdminMode(false)}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Site
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Panel</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-secondary-800 rounded-lg shadow-sm dark:shadow-md p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 dark:bg-primary-700 text-primary-600 dark:text-primary-100'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 bg-white dark:bg-secondary-800 rounded-lg shadow-sm dark:shadow-md p-6"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;