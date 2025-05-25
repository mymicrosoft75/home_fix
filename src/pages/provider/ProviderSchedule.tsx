import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format, addDays, subDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks } from 'date-fns';

// Mock appointments data
const appointments = [
  {
    id: 1,
    date: new Date(2025, 4, 15),
    startTime: '08:30',
    endTime: '10:00',
    client: 'John Doe',
    service: 'Pipe Repair',
    location: '123 Main St, Apt 4B',
    status: 'completed',
  },
  {
    id: 2,
    date: new Date(2025, 4, 15),
    startTime: '10:30',
    endTime: '12:00',
    client: 'Jane Smith',
    service: 'Faucet Installation',
    location: '456 Oak Ave',
    status: 'upcoming',
  },
  {
    id: 3,
    date: new Date(2025, 4, 15),
    startTime: '14:00',
    endTime: '16:00',
    client: 'Emily Wilson',
    service: 'Drain Cleaning',
    location: '789 Pine Blvd',
    status: 'upcoming',
  },
  {
    id: 4,
    date: new Date(2025, 4, 16),
    startTime: '09:00',
    endTime: '11:00',
    client: 'Michael Brown',
    service: 'Water Heater Installation',
    location: '101 Elm St',
    status: 'upcoming',
  },
  {
    id: 5,
    date: new Date(2025, 4, 17),
    startTime: '13:00',
    endTime: '15:00',
    client: 'Sarah Johnson',
    service: 'Toilet Repair',
    location: '202 Maple Dr',
    status: 'upcoming',
  },
  {
    id: 6,
    date: new Date(2025, 4, 19),
    startTime: '10:00',
    endTime: '12:00',
    client: 'Robert Davis',
    service: 'Sink Installation',
    location: '303 Cedar Ln',
    status: 'upcoming',
  },
];

type ViewMode = 'day' | 'week' | 'month';

const ProviderSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  
  const handlePrevious = () => {
    if (viewMode === 'day') {
      setSelectedDate(subDays(selectedDate, 1));
    } else if (viewMode === 'week') {
      setSelectedDate(subWeeks(selectedDate, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setSelectedDate(newDate);
    }
  };
  
  const handleNext = () => {
    if (viewMode === 'day') {
      setSelectedDate(addDays(selectedDate, 1));
    } else if (viewMode === 'week') {
      setSelectedDate(addWeeks(selectedDate, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setSelectedDate(newDate);
    }
  };
  
  const handleToday = () => {
    setSelectedDate(new Date());
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      case 'upcoming':
        return (
          <span className="flex items-center text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unknown
          </span>
        );
    }
  };
  
  // Function to get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.date, date)
    );
  };
  
  // Render different views based on view mode
  const renderSchedule = () => {
    if (viewMode === 'day') {
      const appointmentsForDay = getAppointmentsForDate(selectedDate);
      
      return (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b text-center">
            <h3 className="text-lg font-semibold">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
          </div>
          
          <div className="p-4">
            {appointmentsForDay.length > 0 ? (
              <div className="space-y-4">
                {appointmentsForDay.map(appointment => (
                  <div key={appointment.id} className="flex gap-4 p-3 rounded-md hover:bg-gray-50">
                    <div className={`w-2 self-stretch rounded-full ${getStatusColor(appointment.status)}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{appointment.startTime} - {appointment.endTime}</span>
                        {getStatusBadge(appointment.status)}
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted" />
                <p className="font-medium">No appointments scheduled for this day.</p>
                <p className="text-sm mt-1">Enjoy your time off!</p>
              </div>
            )}
          </div>
        </div>
      );
    } else if (viewMode === 'week') {
      // Calculate start and end of week
      const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday as start of week
      const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start, end });
      
      return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b text-center">
            <h3 className="text-lg font-semibold">
              {format(start, 'MMMM d')} - {format(end, 'MMMM d, yyyy')}
            </h3>
          </div>
          
          <div className="grid grid-cols-7 border-b">
            {days.map((day, index) => (
              <div key={index} className="text-center p-2 border-r last:border-r-0">
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className={`text-lg mt-1 w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                  isSameDay(day, new Date()) ? 'bg-primary text-white' : ''
                }`}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 min-h-[300px]">
            {days.map((day, index) => {
              const appointmentsForDay = getAppointmentsForDate(day);
              
              return (
                <div key={index} className="border-r last:border-r-0 p-2">
                  {appointmentsForDay.length > 0 ? (
                    <div className="space-y-2">
                      {appointmentsForDay.map(appointment => (
                        <div key={appointment.id} className="text-xs p-2 rounded-md bg-primary/10 border-l-2 border-primary">
                          <div className="font-medium">{appointment.startTime}</div>
                          <div className="font-medium">{appointment.service}</div>
                          <div className="text-muted-foreground truncate">{appointment.client}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                      No appointments
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      // Month view
      return (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b text-center">
            <h3 className="text-lg font-semibold">
              {format(selectedDate, 'MMMM yyyy')}
            </h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* This is a simplified month view without actual calculations */}
              {Array.from({ length: 31 }).map((_, index) => {
                const day = index + 1;
                const hasAppointments = appointments.some(a => a.date.getDate() === day && a.date.getMonth() === selectedDate.getMonth());
                
                return (
                  <div 
                    key={index}
                    className={`h-14 border rounded-md flex flex-col p-1 ${
                      day === selectedDate.getDate() ? 'bg-primary/10 border-primary' : ''
                    }`}
                  >
                    <div className="text-right text-sm">{day}</div>
                    {hasAppointments && (
                      <div className="mt-auto">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mx-auto"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">
            Manage your appointments and availability.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('day')}
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === 'day' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Day
          </button>
          <button 
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === 'week' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === 'month' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={handleNext}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button 
            onClick={handleToday}
            className="px-3 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Today
          </button>
        </div>
        
        <div>
          <button className="btn btn-primary">
            Set Availability
          </button>
        </div>
      </div>
      
      {renderSchedule()}
    </div>
  );
};

export default ProviderSchedule;