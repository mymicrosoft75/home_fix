import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  CheckSquare,
  X,
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
  clientId: `client-${i % 5 + 1}`,
  providerId: `provider-1`,
  serviceId: `service-${i % 4 + 1}`,
  date: new Date(2025, 5, (i % 30) + 1).toISOString(),
  timeSlot: `${9 + (i % 8)}:00`,
  status: (['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[])[i % 4],
  total: 75 + (i % 5) * 25,
  notes: i % 3 === 0 ? 'Please bring all necessary tools and materials.' : undefined,
  createdAt: new Date(2025, 4, (i % 28) + 1).toISOString(),
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

const ProviderBookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const clientName = clientNames[parseInt(booking.clientId.split('-')[1]) - 1];
    const serviceName = serviceNames[parseInt(booking.serviceId.split('-')[1]) - 1];
    
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
  
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
  };
  
  const handleCloseDetails = () => {
    setSelectedBooking(null);
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
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            Manage your service bookings and appointments.
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
                <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBookings.map((booking) => {
                const clientName = clientNames[parseInt(booking.clientId.split('-')[1]) - 1];
                const serviceName = serviceNames[parseInt(booking.serviceId.split('-')[1]) - 1];
                
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
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex flex-col">
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                        <span className="text-xs">{booking.timeSlot}</span>
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
                        <button 
                          onClick={() => handleViewBooking(booking)} 
                          className="p-1 rounded-md hover:bg-muted" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button className="p-1 rounded-md hover:bg-muted text-success" title="Accept Booking">
                              <CheckSquare className="h-4 w-4" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-muted text-error" title="Decline Booking">
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button className="p-1 rounded-md hover:bg-muted text-success" title="Mark as Completed">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
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
      
      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Booking Details</h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedBooking.id}
                  </p>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="p-1 rounded-md hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(selectedBooking.status)}`}>
                        {getStatusIcon(selectedBooking.status)}
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <p className="text-xl font-bold">{formatCurrency(selectedBooking.total)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <span className="text-sm text-muted-foreground">Service</span>
                    <p className="font-medium">{serviceNames[parseInt(selectedBooking.serviceId.split('-')[1]) - 1]}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Customer</span>
                    <p className="font-medium">{clientNames[parseInt(selectedBooking.clientId.split('-')[1]) - 1]}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Date</span>
                    <p className="font-medium">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Time</span>
                    <p className="font-medium">{selectedBooking.timeSlot}</p>
                  </div>
                </div>
                
                <div className="pb-4 border-b">
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="mt-1">
                    {selectedBooking.notes || 'No additional notes provided.'}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button className="btn btn-primary">
                        Accept Booking
                      </button>
                      <button className="btn btn-outline text-error">
                        Decline Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button className="btn btn-primary">
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;