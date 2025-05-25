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
  ArrowUpRight
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <span className="font-medium">May 23, 2025</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Total Users</p>
              <h3 className="text-3xl font-bold mt-2">1,284</h3>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-success mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12%</span>
            </div>
            <span className="text-muted-foreground">Since last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Bookings</p>
              <h3 className="text-3xl font-bold mt-2">432</h3>
            </div>
            <div className="p-3 rounded-full bg-secondary/10">
              <CalendarClock className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-success mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8%</span>
            </div>
            <span className="text-muted-foreground">Since last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <h3 className="text-3xl font-bold mt-2">$24,832</h3>
            </div>
            <div className="p-3 rounded-full bg-accent/10">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-error mr-2">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>3%</span>
            </div>
            <span className="text-muted-foreground">Since last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Satisfaction</p>
              <h3 className="text-3xl font-bold mt-2">4.8/5</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-success mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5%</span>
            </div>
            <span className="text-muted-foreground">Since last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity and Top Providers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-primary text-sm flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Pipe Repair - James Wilson</p>
                    <p className="text-sm text-muted-foreground mt-1">May {20 + index}, 2025 • 10:00 AM</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index % 3 === 0 
                        ? 'bg-green-100 text-green-700' 
                        : index % 3 === 1 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-amber-100 text-amber-700'
                    }`}>
                      {index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Top Service Providers</h3>
            <Link to="/admin/users" className="text-primary text-sm flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Robert Johnson', category: 'Plumbing', jobs: 183, rating: 4.9 },
              { name: 'Sarah Miller', category: 'Cleaning', jobs: 157, rating: 4.8 },
              { name: 'David Chen', category: 'Electrical', jobs: 129, rating: 4.7 },
              { name: 'Lisa Brown', category: 'Painting', jobs: 112, rating: 4.7 },
              { name: 'Michael Davis', category: 'Carpentry', jobs: 98, rating: 4.6 },
            ].map((provider, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm">
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{provider.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.jobs} jobs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
          <div className="space-y-4">
            {[
              { category: 'Plumbing', percentage: 35, color: 'bg-blue-500' },
              { category: 'Electrical', percentage: 25, color: 'bg-yellow-500' },
              { category: 'Cleaning', percentage: 20, color: 'bg-cyan-500' },
              { category: 'Carpentry', percentage: 15, color: 'bg-amber-500' },
              { category: 'Painting', percentage: 5, color: 'bg-violet-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-6">New User Signups</h3>
          <div className="h-56 flex items-end">
            {[35, 45, 30, 65, 40, 80, 60].map((height, index) => (
              <div key={index} className="flex-1 flex items-end mx-1">
                <div 
                  className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-colors"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors flex justify-between items-center">
              <span className="font-medium">Add New Service</span>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors flex justify-between items-center">
              <span className="font-medium">Approve Providers</span>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors flex justify-between items-center">
              <span className="font-medium">Review Feedback</span>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors flex justify-between items-center">
              <span className="font-medium">Generate Reports</span>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;