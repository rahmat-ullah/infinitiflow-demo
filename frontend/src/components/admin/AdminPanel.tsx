import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  ChevronLeft,
  Home,
  Grid3X3,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import Dashboard from './Dashboard';
import ContentManager from './ContentManager';
import UserManager from './UserManager';
import SettingsPanel from './SettingsPanel';
import HeroManager from './HeroManager';
import FeaturesManager from './FeaturesManager';
import BlogManager from './BlogManager';
import TestimonialManager from './TestimonialManager';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { setAdminMode } = useAdminStore();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', name: 'Hero Section', icon: Home },
    { id: 'features', name: 'Features', icon: Grid3X3 },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
    { id: 'blogs', name: 'Blog', icon: BookOpen },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'hero':
        return <HeroManager />;
      case 'features':
        return <FeaturesManager />;
      case 'testimonials':
        return <TestimonialManager />;
      case 'blogs':
        return <BlogManager />;
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
      {/* Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-gray-200 dark:border-secondary-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAdminMode(false)}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                Back to Site
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Admin Panel
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-secondary-900 border-r border-gray-200 dark:border-secondary-700 min-h-screen">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;