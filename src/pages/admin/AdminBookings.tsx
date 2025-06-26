import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { formatCurrency } from '../../lib/utils';

// Mock data - would come from API in real app
const bookings: Booking[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `booking-${i + 1}`,
  client_id: `client-${i % 5 + 1}`,
  provider_id: `provider-${i % 3 + 1}`,
  service_id: `service-${i % 4 + 1}`,
  date: new Date(2025, 5, (i % 30) + 1).toISOString(),
  time_slot: `${9 + (i % 8)}:00`,
  status: (['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[])[i % 4],
  total: 75 + (i % 5) * 25,
  notes: i % 3 === 0 ? 'Please bring all necessary tools and materials.' : undefined,
  created_at: new Date(2025, 4, (i % 28) + 1).toISOString(),
  updated_at: new Date(2025, 4, (i % 28) + 1).toISOString()
}));

// Client names for mock data
const clientNames = [
  'John Doe',
  'Jane Smith',
  'Emily Wilson',
  'Michael Brown',
  'Sarah Johnson',
];

// Service names for mock data
const serviceNames = [
  'Plumbing Repair',
  'Electrical Wiring',
  'House Cleaning',
  'Appliance Installation',
];

// Provider names for mock data
const providerNames = [
  'Robert Johnson',
  'David Chen',
  'Lisa Brown',
];

const AdminBookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const clientName = clientNames[parseInt(booking.client_id.split('-')[1]) - 1];
    const serviceName = serviceNames[parseInt(booking.service_id.split('-')[1]) - 1];
    
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the state change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'confirmed':
        return <Calendar className="h-4 w-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">
            Manage and track service bookings across your platform.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full md:max-w-xs"
              />
            </form>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
                className="form-input"
                aria-label="Filter bookings by status"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <button className="btn btn-outline flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
              
              <button className="btn btn-outline flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left text-sm font-medium">Booking ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Provider</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBookings.map((booking) => {
                const clientName = clientNames[parseInt(booking.client_id.split('-')[1]) - 1];
                const serviceName = serviceNames[parseInt(booking.service_id.split('-')[1]) - 1];
                const providerName = providerNames[parseInt(booking.provider_id.split('-')[1]) - 1];
                
                return (
                  <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {booking.id}
                    </td>
                    <td className="px-4 py-3">
                      {serviceName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        {clientName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {providerName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex flex-col">
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                        <span className="text-xs">{booking.time_slot}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(booking.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-md hover:bg-muted" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-md hover:bg-muted" title="Edit Booking">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-md hover:bg-muted text-error" title="Cancel Booking">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstBooking + 1}-{Math.min(indexOfLastBooking, filteredBookings.length)} of {filteredBookings.length} bookings
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNumber = currentPage;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                    currentPage === pageNumber 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;