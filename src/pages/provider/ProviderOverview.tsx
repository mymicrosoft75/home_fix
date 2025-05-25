import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  XCircle,
  User,
  MapPin
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';

// Mock data - would come from API in real app
const upcomingBookings: Booking[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `booking-${i + 1}`,
  clientId: `client-${i % 5 + 1}`,
  providerId: `provider-1`,
  serviceId: `service-${i % 4 + 1}`,
  date: new Date(2025, 5, (i % 30) + 1).toISOString(),
  timeSlot: `${9 + (i % 8)}:00`,
  status: i === 0 ? 'pending' : 'confirmed',
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

const ProviderOverview: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Robert! Here's your overview for today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <span className="font-medium">{today}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Today's Jobs</p>
              <h3 className="text-3xl font-bold mt-2">3</h3>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="text-muted-foreground">
              Next: 10:30 AM - Plumbing Repair
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">This Week</p>
              <h3 className="text-3xl font-bold mt-2">12</h3>
            </div>
            <div className="p-3 rounded-full bg-secondary/10">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-success mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>20%</span>
            </div>
            <span className="text-muted-foreground">Since last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Earnings</p>
              <h3 className="text-3xl font-bold mt-2">$1,250</h3>
            </div>
            <div className="p-3 rounded-full bg-accent/10">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-success mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>15%</span>
            </div>
            <span className="text-muted-foreground">This month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground">Rating</p>
              <h3 className="text-3xl font-bold mt-2">4.9/5</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-muted-foreground">Based on 183 reviews</span>
          </div>
        </div>
      </div>

      {/* Today's Schedule and Upcoming Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Today's Schedule</h3>
            <Link to="/provider/schedule" className="text-primary text-sm flex items-center hover:underline">
              View Full Schedule <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { time: '08:30 AM', client: 'John Doe', service: 'Pipe Repair', location: '123 Main St, Apt 4B', status: 'completed' },
              { time: '10:30 AM', client: 'Jane Smith', service: 'Faucet Installation', location: '456 Oak Ave', status: 'upcoming' },
              { time: '02:00 PM', client: 'Emily Wilson', service: 'Drain Cleaning', location: '789 Pine Blvd', status: 'upcoming' },
            ].map((appointment, index) => (
              <div key={index} className="flex gap-4 p-3 rounded-md hover:bg-gray-50">
                <div className={`w-2 self-stretch rounded-full ${
                  appointment.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{appointment.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      appointment.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {appointment.status === 'completed' ? (
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 inline mr-1" />
                      )}
                      {appointment.status}
                    </span>
                  </div>
                  <p className="font-medium mt-1">{appointment.service}</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="h-3 w-3 mr-1" />
                    {appointment.client}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {appointment.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
            <Link to="/provider/bookings" className="text-primary text-sm flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => {
              const clientName = clientNames[parseInt(booking.clientId.split('-')[1]) - 1];
              const serviceName = serviceNames[parseInt(booking.serviceId.split('-')[1]) - 1];
              
              return (
                <div key={booking.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{serviceName}</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(booking.date).toLocaleDateString()} • {booking.timeSlot}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <User className="h-3 w-3 mr-1" />
                        {clientName}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'pending' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {booking.status === 'pending' ? (
                          <Clock className="h-3 w-3 inline mr-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                        )}
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Reviews</h3>
          <Link to="/provider/reviews" className="text-primary text-sm flex items-center hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { client: 'John Doe', rating: 5, date: 'May 15, 2025', comment: 'Robert was professional, on time, and fixed our leaking pipe quickly. Highly recommended!', service: 'Pipe Repair' },
            { client: 'Emily Wilson', rating: 5, date: 'May 10, 2025', comment: 'Excellent service! Robert explained everything clearly and did a great job installing our new faucet.', service: 'Faucet Installation' },
            { client: 'Michael Brown', rating: 4, date: 'May 5, 2025', comment: 'Good job unclogging our drain. Would use again for future plumbing needs.', service: 'Drain Cleaning' },
          ].map((review, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{review.client}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm mb-2">"{review.comment}"</p>
              <p className="text-xs text-muted-foreground">
                Service: <span className="font-medium text-foreground">{review.service}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderOverview;