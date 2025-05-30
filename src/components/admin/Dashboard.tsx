import React from 'react';
import { 
  Users,
  FileText,
  Activity,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      trend: '+12%',
      positive: true
    },
    {
      title: 'Content Pieces',
      value: '156',
      icon: FileText,
      trend: '+8%',
      positive: true
    },
    {
      title: 'Active Sessions',
      value: '89',
      icon: Activity,
      trend: '+15%',
      positive: true
    },
    {
      title: 'Engagement Rate',
      value: '24.8%',
      icon: TrendingUp,
      trend: '-2%',
      positive: false
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white dark:bg-secondary-700 rounded-xl shadow-sm dark:shadow-md p-6 border border-gray-100 dark:border-secondary-600"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary-50 dark:bg-primary-800 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600 dark:text-success-300' : 'text-red-600 dark:text-error-300'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
        <div className="bg-white dark:bg-secondary-700 rounded-xl shadow-sm dark:shadow-md border border-gray-100 dark:border-secondary-600 divide-y divide-gray-100 dark:divide-secondary-600">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New user registration</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">User ID: #12345</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;