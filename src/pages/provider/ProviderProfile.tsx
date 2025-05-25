import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  DollarSign,
  Edit,
  Camera,
  CheckCircle
} from 'lucide-react';
import { Provider, ServiceCategory } from '../../types';
import { generateTimeSlots } from '../../lib/utils';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  hourlyRate: number;
  services: ServiceCategory[];
  availability: {
    [day: string]: string[];
  };
}

// Mock provider data
const providerData: Provider = {
  id: 'provider-1',
  name: 'Apurbo Gomez',
  email: 'apurbo@example.com',
  role: 'provider',
  services: ['plumbing', 'electrical'],
  bio: 'Professional plumber with 15 years of experience in residential and commercial projects. Specializing in pipe repairs, installations, and bathroom renovations.',
  rating: 4.9,
  hourlyRate: 45,
  availability: {
    Monday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    Tuesday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    Wednesday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    Thursday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    Friday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
  },
  completedJobs: 183,
  createdAt: '2022-01-15',
  avatar: 'https://images.pexels.com/photos/8961001/pexels-photo-8961001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  phone: '(123) 456-7890',
  address: '123 Main St, Anytown, AN 12345',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = generateTimeSlots(8, 18);

const ProviderProfile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
      name: providerData.name,
      email: providerData.email,
      phone: providerData.phone || '',
      address: providerData.address || '',
      bio: providerData.bio,
      hourlyRate: providerData.hourlyRate,
      services: providerData.services as ServiceCategory[],
      availability: providerData.availability,
    },
  });
  
  const watchedServices = watch('services');
  const watchedAvailability = watch('availability');
  
  const toggleEdit = () => {
    setEditing(!editing);
  };
  
  const toggleTimeSlot = (day: string, time: string) => {
    const currentSlots = [...(watchedAvailability[day] || [])];
    
    if (currentSlots.includes(time)) {
      // Remove time slot
      const updatedSlots = currentSlots.filter(slot => slot !== time);
      setValue(`availability.${day}`, updatedSlots);
    } else {
      // Add time slot
      const updatedSlots = [...currentSlots, time].sort();
      setValue(`availability.${day}`, updatedSlots);
    }
  };
  
  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile update:', data);
    setEditing(false);
    // Here we would normally call an API to update the profile
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and availability.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={toggleEdit}
            className={`btn ${editing ? 'btn-outline' : 'btn-primary'}`}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 text-center border-b">
              <div className="relative inline-block mb-4">
                <img
                  src={providerData.avatar}
                  alt={providerData.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary"
                />
                {editing && (
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold">{providerData.name}</h2>
              <p className="text-muted-foreground">{providerData.services.join(', ')}</p>
              
              <div className="flex items-center justify-center mt-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{providerData.rating}</span>
                <span className="text-muted-foreground ml-1">({providerData.completedJobs} jobs)</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Email</span>
                    <span className="font-medium">{providerData.email}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Phone</span>
                    <span className="font-medium">{providerData.phone}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Address</span>
                    <span className="font-medium">{providerData.address}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Hourly Rate</span>
                    <span className="font-medium">${providerData.hourlyRate}/hour</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Member Since</span>
                    <span className="font-medium">{new Date(providerData.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {providerData.services.map((service, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Verification</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    <span>Identity Verified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    <span>Background Check Passed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    <span>License Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Edit Form */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editing ? 'Edit Profile' : 'About Me'}
              </h3>
            </div>
            
            {editing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className={`form-input pl-10 ${errors.name ? 'border-error' : ''}`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-error">{errors.name.message}</p>
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
                      <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">
                        Hourly Rate ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          id="hourlyRate"
                          type="number"
                          {...register('hourlyRate', { 
                            required: 'Hourly rate is required',
                            min: {
                              value: 10,
                              message: 'Hourly rate must be at least $10'
                            }
                          })}
                          className={`form-input pl-10 ${errors.hourlyRate ? 'border-error' : ''}`}
                          placeholder="45"
                        />
                      </div>
                      {errors.hourlyRate && (
                        <p className="mt-1 text-sm text-error">{errors.hourlyRate.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
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
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-1">
                      Professional Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      {...register('bio', { required: 'Bio is required' })}
                      className={`form-input ${errors.bio ? 'border-error' : ''}`}
                      placeholder="Tell clients about your experience, skills, and expertise..."
                    ></textarea>
                    {errors.bio && (
                      <p className="mt-1 text-sm text-error">{errors.bio.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Services Offered
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'plumbing', 'electrical', 'cleaning', 
                        'carpentry', 'painting', 'gardening'
                      ].map((service) => (
                        <div key={service} className="flex items-center">
                          <input
                            id={`service-${service}`}
                            type="checkbox"
                            value={service}
                            {...register('services', { required: 'Select at least one service' })}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={`service-${service}`} className="ml-2 text-sm capitalize">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.services && (
                      <p className="mt-1 text-sm text-error">{errors.services.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="btn btn-outline mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <p className="whitespace-pre-line">{providerData.bio}</p>
              </div>
            )}
          </div>
          
          {/* Availability Management */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b flex flex-wrap justify-between items-center">
              <h3 className="text-lg font-semibold">
                Availability
              </h3>
              {editing && (
                <div className="mt-2 sm:mt-0">
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="form-input py-1"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {editing ? (
                <div>
                  <h4 className="font-medium mb-4">Select available time slots for {selectedDay}</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map(time => {
                      const isSelected = watchedAvailability[selectedDay]?.includes(time);
                      
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => toggleTimeSlot(selectedDay, time)}
                          className={`p-2 rounded-md text-center transition-all ${
                            isSelected 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {days.map(day => {
                    const slots = providerData.availability[day] || [];
                    
                    return (
                      <div key={day} className="pb-4 border-b last:border-0 last:pb-0">
                        <h4 className="font-medium mb-2">{day}</h4>
                        {slots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {slots.map(time => (
                              <span key={time} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {time}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">No availability</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;