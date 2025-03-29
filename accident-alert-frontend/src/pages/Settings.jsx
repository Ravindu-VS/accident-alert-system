import React, { useState } from 'react';
import { FiBell, FiShield, FiMap } from 'react-icons/fi';
import BackButton from '../components/BackButton';


const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      accidents: true,
      alerts: true,
      updates: false
    },
    privacy: {
      shareLocation: true,
      anonymousReporting: true
    },
    geofencing: {
      radius: 500,
      highRiskAlerts: true
    }
  });

  const handleSettingChange = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <BackButton />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            System Settings
          </h2>

          {/* Notification Settings */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FiBell className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <div className="space-y-4 ml-8">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Accident Alerts</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.accidents}
                    onChange={() => handleSettingChange('notifications', 'accidents')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Proximity Alerts</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.alerts}
                    onChange={() => handleSettingChange('notifications', 'alerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FiShield className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy</h3>
            </div>
            <div className="space-y-4 ml-8">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Share Location</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.shareLocation}
                    onChange={() => handleSettingChange('privacy', 'shareLocation')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Anonymous Reporting</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.anonymousReporting}
                    onChange={() => handleSettingChange('privacy', 'anonymousReporting')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Geofencing Settings */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiMap className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Geofencing</h3>
            </div>
            <div className="space-y-4 ml-8">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Alert Radius (meters)</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="100"
                  value={settings.geofencing.radius}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    geofencing: {
                      ...prev.geofencing,
                      radius: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Current radius: {settings.geofencing.radius}m
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">High-Risk Zone Alerts</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.geofencing.highRiskAlerts}
                    onChange={() => handleSettingChange('geofencing', 'highRiskAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;