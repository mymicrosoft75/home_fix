import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CalendarClock,
  DollarSign,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Package
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  // Mock data - replace with real data from your API
  const stats = [
    {
      name: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Active Bookings',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: Calendar,
    },
    {
      name: 'Services Offered',
      value: '48',
      change: '+3.1%',
      changeType: 'increase',
      icon: Package,
    },
    {
      name: 'Revenue',
      value: '$45,233',
      change: '+15.3%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      customer: 'John Doe',
      date: '2024-03-15',
      status: 'Completed',
      amount: '$120',
    },
    {
      id: 2,
      service: 'Electrical Work',
      customer: 'Jane Smith',
      date: '2024-03-14',
      status: 'In Progress',
      amount: '$200',
    },
    {
      id: 3,
      service: 'House Cleaning',
      customer: 'Mike Johnson',
      date: '2024-03-14',
      status: 'Scheduled',
      amount: '$150',
    },
    {
      id: 4,
      service: 'Pest Control',
      customer: 'Sarah Wilson',
      date: '2024-03-13',
      status: 'Completed',
      amount: '$180',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline">Download Report</button>
          <button className="btn btn-primary">View All Analytics</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Bookings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 4 of 25 bookings
            </div>
            <div>
              <button className="btn btn-outline btn-sm">View All Bookings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;