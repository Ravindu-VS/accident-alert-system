import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { FiTrendingUp, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import BackButton from '../components/BackButton';
import 'E:\KDU\Projects\Accident-Alert-System\accident-alert-frontend\src\styles\statistics.css'; 


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // Sample data for charts
  const accidentTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Accidents',
        data: [12, 19, 15, 25, 22, 18],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const riskZoneData = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
    datasets: [
      {
        label: 'Risk Level',
        data: [85, 72, 65, 55, 48],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <BackButton />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Accident Statistics and Analytics
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <FiTrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Accidents</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full">
                  <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Risk Zones</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                  <FiMapPin className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monitored Areas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Accident Trends
              </h3>
              <div className="h-80">
                <Line 
                  data={accidentTrendData}
                  options={options}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Risk Zone Analysis
              </h3>
              <div className="h-80">
                <Bar 
                  data={riskZoneData}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;