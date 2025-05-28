import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';
import Button from '../ui/Button';

interface Content {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled';
  type: 'post' | 'page';
  lastModified: string;
  scheduledDate?: string;
}

const ContentManager: React.FC = () => {
  const [contents] = useState<Content[]>([
    {
      id: '1',
      title: 'Getting Started with AI Content Generation',
      status: 'published',
      type: 'post',
      lastModified: '2025-01-15'
    },
    {
      id: '2',
      title: 'Content Strategy Guide',
      status: 'draft',
      type: 'page',
      lastModified: '2025-01-14'
    },
    {
      id: '3',
      title: 'Upcoming Features Announcement',
      status: 'scheduled',
      type: 'post',
      lastModified: '2025-01-13',
      scheduledDate: '2025-02-01'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'all' | 'posts' | 'pages'>('all');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
        >
          New Content
        </Button>
      </div>

      {/* Content Type Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        {['all', 'posts', 'pages'].map((tab) => (
          <button
            key={tab}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${
              selectedTab === tab
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab(tab as 'all' | 'posts' | 'pages')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contents
                .filter(content => selectedTab === 'all' || content.type === selectedTab.slice(0, -1))
                .map((content) => (
                  <motion.tr
                    key={content.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{content.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-600">{content.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        content.status === 'published'
                          ? 'bg-success-100 text-success-800'
                          : content.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-primary-100 text-primary-800'
                      }`}>
                        {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(content.lastModified).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-gray-400 hover:text-primary-500 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-error-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Editor Modal would go here */}
      {/* Media Library Modal would go here */}
    </div>
  );
};

export default ContentManager;