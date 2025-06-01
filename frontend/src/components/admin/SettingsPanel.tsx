import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Shield, 
  Mail, 
  Database,
  Palette,
  Bell,
  Key,
  Server,
  AlertTriangle
} from 'lucide-react';
import Button from '../ui/Button';
import { useThemeStore } from '../../store/themeStore'; // Import useThemeStore

const SettingsPanel: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore(); // Get theme and toggleTheme
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'InfinitiFlow',
    siteDescription: 'Generate amazing content with AI',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    systemNotifications: false,
    autoBackup: true,
    backupFrequency: 'daily',
    maxFileSize: '10',
    allowedFileTypes: 'jpg,png,pdf,docx',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    // darkMode: false, // Removed darkMode from local settings
    analyticsEnabled: true,
    cookieConsent: true
  });

  const sections = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'storage', name: 'Storage', icon: Database },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save settings to your backend
    console.log('Saving settings:', settings);
    // Show success notification
  };

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Appearance Settings</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Dark Mode Toggle using useThemeStore */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode for the application</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Mock Primary Color Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Color
          </label>
          <input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
            className="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700"
          />
        </div>

        {/* Mock Secondary Color Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secondary Color
          </label>
          <input
            type="color"
            value={settings.secondaryColor}
            onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
            className="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700"
          />
        </div>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">General Settings</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleSettingChange('siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Maintenance Mode</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily disable access to the site</p>
          </div>
          <button
            onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.maintenanceMode ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">User Registration</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Allow new users to register</p>
          </div>
          <button
            onClick={() => handleSettingChange('userRegistration', !settings.userRegistration)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.userRegistration ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.userRegistration ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-700/30 border border-yellow-200 dark:border-yellow-600/50 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Security Notice</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Make sure to regularly update your security settings and use strong passwords.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Session Timeout (minutes)
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100">
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="480">8 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Policy
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-secondary-600 dark:border-secondary-500" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Minimum 8 characters</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-secondary-600 dark:border-secondary-500" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Require uppercase letters</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-secondary-600 dark:border-secondary-500" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Require numbers</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-secondary-600 dark:border-secondary-500" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Require special characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStorageSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Storage Settings</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum File Size (MB)
          </label>
          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Allowed File Types
          </label>
          <input
            type="text"
            value={settings.allowedFileTypes}
            onChange={(e) => handleSettingChange('allowedFileTypes', e.target.value)}
            placeholder="jpg,png,pdf,docx"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate file extensions with commas</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Auto Backup</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup your data</p>
          </div>
          <button
            onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.autoBackup ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {settings.autoBackup && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Backup Frequency
            </label>
            <select 
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent dark:bg-secondary-700 dark:text-gray-100"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'storage':
        return renderStorageSettings();
      case 'appearance': // Added case for appearance
        return renderAppearanceSettings();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Server size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Coming Soon</h3>
            <p className="text-gray-500 dark:text-gray-400">This settings section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Notice */}
      <div className="bg-blue-50 dark:bg-blue-700/30 border border-blue-200 dark:border-blue-600/50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Important Note</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Most settings displayed here require backend integration to persist. 
              Currently, only the Dark Mode theme setting (under Appearance) is functional and saved globally. 
              Changes to other settings are for demonstration and will be logged to the console when you click 'Save Changes'.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
        <Button
          variant="primary"
          leftIcon={<Save size={16} />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-50 dark:bg-primary-700 text-primary-600 dark:text-primary-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 bg-white dark:bg-secondary-700 rounded-xl shadow-sm dark:shadow-md border border-gray-100 dark:border-secondary-600 p-6"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPanel; 