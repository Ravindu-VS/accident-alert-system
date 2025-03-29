import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiUsers, FiActivity, FiMap, FiPhone, FiSettings, FiLogOut, FiTrendingUp, FiShield } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import 'E:\KDU\Projects\Accident-Alert-System\accident-alert-frontend\src\styles\dashboard.css';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for demo
  const stats = {
    totalIncidents: 156,
    activeAlerts: 23,
    affectedAreas: 12,
    respondersAvailable: 45,
    highRiskZones: 8,
    emergencyContacts: 15,
    recentAlerts: 5,
    systemUptime: "99.9%"
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Incidents",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const SAMPLE_INCIDENTS = [
    {
      location: "Main Street & 5th Ave",
      type: "Vehicle Collision",
      status: "active",
      date: "2023-12-20",
      severity: "High",
      responseTime: "2 mins"
    },
    {
      location: "Highway 101, Mile 25",
      type: "Road Hazard",
      status: "resolved",
      date: "2023-12-19",
      severity: "Medium",
      responseTime: "5 mins"
    },
    {
      location: "Downtown Plaza",
      type: "Vehicle Collision",
      status: "active",
      date: "2023-12-18",
      severity: "High",
      responseTime: "3 mins"
    },
    {
      location: "West Bridge",
      type: "Infrastructure",
      status: "pending",
      date: "2023-12-17",
      severity: "Low",
      responseTime: "8 mins"
    },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const quickActions = [
    {
      title: "View Risk Map",
      icon: <FiMap className="h-6 w-6" />,
      color: "bg-blue-500",
      onClick: () => navigate("/map")
    },
    {
      title: "Emergency Contacts",
      icon: <FiPhone className="h-6 w-6" />,
      color: "bg-green-500",
      onClick: () => navigate("/contacts")
    },
    {
      title: "System Settings",
      icon: <FiSettings className="h-6 w-6" />,
      color: "bg-purple-500",
      onClick: () => navigate("/settings")
    },
    {
      title: "View Statistics",
      icon: <FiTrendingUp className="h-6 w-6" />,
      color: "bg-orange-500",
      onClick: () => navigate("/statistics")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Accident Alert System
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <FiLogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-xl shadow-md hover:opacity-90 transition-opacity`}
            >
              <div className="flex items-center space-x-3">
                {action.icon}
                <span className="font-medium">{action.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiAlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Incidents
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalIncidents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <FiActivity className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.activeAlerts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiMap className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  High Risk Zones
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.highRiskZones}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Emergency Contacts
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.emergencyContacts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">System Uptime</span>
                <span className="text-green-600 font-medium">{stats.systemUptime}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Recent Alerts</span>
                <span className="text-blue-600 font-medium">{stats.recentAlerts}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Monitoring</span>
                <span className="text-green-600 font-medium">Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Incident Trends
          </h2>
          <div className="h-80">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Incidents
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {SAMPLE_INCIDENTS.map((incident, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {incident.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {incident.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            incident.status === "active"
                              ? "bg-green-100 text-green-800"
                              : incident.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            incident.severity === "High"
                              ? "bg-red-100 text-red-800"
                              : incident.severity === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {incident.responseTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(incident.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;