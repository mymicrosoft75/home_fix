import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Settings, 
  HelpCircle, 
  LogOut,
  DollarSign,
  Star,
  Menu,
  X
} from 'lucide-react';
import ProviderOverview from './ProviderOverview';
import ProviderSchedule from './ProviderSchedule';
import ProviderBookings from './ProviderBookings';
import ProviderProfile from './ProviderProfile';
import { cn } from '../../lib/utils';

const ProviderDashboard: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === `/provider${path}`;
  };
  
  // Mock provider data
  const provider = {
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://images.pexels.com/photos/8961001/pexels-photo-8961001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed z-20 bottom-4 right-4 p-2 rounded-full bg-primary text-white shadow-lg md:hidden"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-10 transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <Link to="/provider" className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="ml-2 text-xl font-bold">Provider Portal</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 overflow-auto">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/provider"
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    isActive('') 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/provider/schedule"
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    isActive('/schedule') 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  My Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/provider/bookings"
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    isActive('/bookings') 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <Clock className="h-5 w-5 mr-3" />
                  Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/provider/profile"
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    isActive('/profile') 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <Star className="h-5 w-5 mr-3" />
                  My Profile
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/provider/settings"
                    onClick={closeSidebar}
                    className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/provider/help"
                    onClick={closeSidebar}
                    className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              {provider.avatar ? (
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  {provider.name.charAt(0)}
                </div>
              )}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{provider.name}</p>
                <p className="text-xs text-gray-500">{provider.email}</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "md:ml-64" : "ml-0 md:ml-64"
      )}>
        <Routes>
          <Route index element={<ProviderOverview />} />
          <Route path="schedule" element={<ProviderSchedule />} />
          <Route path="bookings" element={<ProviderBookings />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="*" element={<ProviderOverview />} />
        </Routes>
      </main>
    </div>
  );
};

export default ProviderDashboard;