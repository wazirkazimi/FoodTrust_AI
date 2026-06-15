import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Award, Heart, Flag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const [healthMode, setHealthMode] = useState(user?.healthMode || 'default');
  const [vegFilter, setVegFilter] = useState(user?.vegFilter || false);
  const [saving, setSaving] = useState(false);

  const healthModes = [
    {
      id: 'default',
      title: 'Default',
      description: 'Standard health scoring',
      icon: '⚖️'
    },
    {
      id: 'weightLoss',
      title: 'Weight Loss',
      description: 'Focus on calories and fat',
      icon: '⚖️'
    },
    {
      id: 'diabetic',
      title: 'Diabetic',
      description: 'Monitor sugar content',
      icon: '🩺'
    },
    {
      id: 'gym',
      title: 'Gym',
      description: 'High protein focus',
      icon: '💪'
    }
  ];

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateUser({
        healthMode,
        vegFilter
      });
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const stats = [
    { label: 'Total Scans', value: '24', icon: Award },
    { label: 'Bookmarked', value: '8', icon: Heart },
    { label: 'Reports Filed', value: '2', icon: Flag }
  ];

  return (
    <PageWrapper title="Profile">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} hover className="text-center">
                  <Icon size={24} className="text-primary-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Health Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Mode</h3>
            <div className="grid grid-cols-2 gap-3">
              {healthModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setHealthMode(mode.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 ${
                    healthMode === mode.id
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mode.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-800">{mode.title}</h4>
                      <p className="text-xs text-gray-600">{mode.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">VEG Only Filter</p>
                  <p className="text-sm text-gray-600">Show only vegetarian products</p>
                </div>
                <button
                  onClick={() => setVegFilter(!vegFilter)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    vegFilter ? 'bg-success' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      vegFilter ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Save Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={handleSaveSettings}
            className="w-full"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-danger text-danger hover:bg-danger hover:text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Profile;