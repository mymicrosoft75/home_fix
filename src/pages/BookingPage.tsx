import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle,
  CreditCard,
  AlertTriangle,
  User,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';
import { Service } from '../types';
import { formatCurrency, generateTimeSlots } from '../lib/utils';

interface BookingFormData {
  date: string;
  timeSlot: string;
  address: string;
  phone: string;
  email: string;
  notes: string;
}

// Mock data - would come from API in real app
const services: Service[] = [
  {
    id: '1',
    name: 'Pipe Repair & Installation',
    category: 'plumbing',
    description: 'Expert repair and installation of all types of pipes including PVC, copper, and galvanized steel.',
    price: 85,
    image_url: 'https://images.pexels.com/photos/5257518/pexels-photo-5257518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 2,
    created_at: "",
    updated_at: ""
  },
  {
    id: '2',
    name: 'Electrical Panel Upgrade',
    category: 'electrical',
    description: 'Upgrade your electrical panel to safely handle your home\'s power needs with modern circuit breakers.',
    price: 250,
    image_url: 'https://images.pexels.com/photos/2062048/pexels-photo-2062048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 4,
    created_at: "",
    updated_at: ""
  },
];

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === serviceId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<Partial<BookingFormData>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();
  
  if (!service) {
    return (
      <div className="container py-20 text-center">
        <AlertTriangle className="h-16 w-16 text-error mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The service you are trying to book does not exist or may have been removed.
        </p>
        <Link to="/services" className="btn btn-primary">
          Browse Services
        </Link>
      </div>
    );
  }

  const today = new Date();
  const startDay = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: startDay,
    end: addDays(startDay, 13),
  });

  const timeSlots = generateTimeSlots(8, 18);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedDate && selectedTimeSlot) {
      setBookingDetails({
        ...bookingDetails,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot,
      });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: BookingFormData) => {
    const fullBookingDetails = {
      ...bookingDetails,
      ...data,
    };
    console.log('Booking submission:', fullBookingDetails);
    setCurrentStep(3);
  };

  return (
    <div className="pt-10 pb-20 bg-gray-50">
      <div className="container">
        {/* Booking Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/services" className="hover:text-primary">Services</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/services/${service.id}`} className="hover:text-primary">{service.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Book</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Book Your Service</h1>
          <p className="text-muted-foreground">
            Complete the steps below to book your {service.name} service.
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className="text-xs font-medium mt-1">Schedule</div>
              <div className="absolute top-4 left-8 w-full h-0.5 bg-gray-200">
                <div className={`h-full bg-primary transition-all ${
                  currentStep >= 2 ? 'w-full' : 'w-0'
                }`}></div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className="text-xs font-medium mt-1">Details</div>
              <div className="absolute top-4 left-8 w-full h-0.5 bg-gray-200">
                <div className={`h-full bg-primary transition-all ${
                  currentStep >= 3 ? 'w-full' : 'w-0'
                }`}></div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <div className="text-xs font-medium mt-1">Confirmation</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Step 1: Select Date and Time */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Select a Date
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {weekDays.map((date) => {
                      const isSelected = selectedDate && 
                        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                      const isPast = date < today;
                      
                      return (
                        <button
                          key={date.toString()}
                          type="button"
                          disabled={isPast}
                          onClick={() => !isPast && handleDateSelect(date)}
                          className={`p-2 rounded-md text-center transition-all ${
                            isSelected 
                              ? 'bg-primary text-white' 
                              : isPast 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="text-xs font-medium">
                            {format(date, 'EEE')}
                          </div>
                          <div className="text-sm font-bold mt-1">
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs">
                            {format(date, 'MMM')}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Time Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Select a Time Slot
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`p-2 rounded-md text-center transition-all ${
                            isSelected 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <Link to={`/services/${service.id}`} className="btn btn-outline">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Service
                  </Link>
                  <button 
                    type="button" 
                    onClick={handleContinue}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className="btn btn-primary"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Enter Contact Information */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Service Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        id="address"
                        type="text"
                        {...register('address', { required: 'Address is required' })}
                        className={`form-input pl-10 ${errors.address ? 'border-error' : ''}`}
                        placeholder="123 Main St, Anytown, AN 12345"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-error">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone', { required: 'Phone number is required' })}
                          className={`form-input pl-10 ${errors.phone ? 'border-error' : ''}`}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`form-input pl-10 ${errors.email ? 'border-error' : ''}`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      {...register('notes')}
                      className="form-input"
                      placeholder="Any additional information for the service provider..."
                    ></textarea>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>{service.name}</span>
                    <span>{formatCurrency(service.price)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Date</span>
                    <span>{bookingDetails.date && format(new Date(bookingDetails.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Time</span>
                    <span>{bookingDetails.timeSlot}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(service.price)}</span>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="btn btn-outline"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                  >
                    Continue to Payment
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your booking has been successfully confirmed. We've sent a confirmation 
                  email with all the details.
                </p>
                
                <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg mb-8 text-left">
                  <h3 className="font-medium mb-4">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{bookingDetails.date && format(new Date(bookingDetails.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{bookingDetails.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">{formatCurrency(service.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking ID:</span>
                      <span>BK-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/profile" className="btn btn-outline">
                    <User className="h-4 w-4 mr-2" />
                    View My Bookings
                  </Link>
                  <Link to="/" className="btn btn-primary">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;