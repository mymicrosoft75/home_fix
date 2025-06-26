import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Service, ProviderProfile, ProviderAvailability, DayOfWeek } from '../../types/supabase';
import { toast } from 'react-hot-toast';
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
import type { ServiceCategory } from '../../types';
import { generateTimeSlots } from '../../lib/utils';

const ProviderProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availability, setAvailability] = useState<ProviderAvailability[]>([]);
  const [formData, setFormData] = useState({
    bio: '',
    hourly_rate: 0,
  });

  const daysOfWeek: DayOfWeek[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    if (user) {
      loadProviderData();
      loadServices();
    }
  }, [user]);

  const loadProviderData = async () => {
    try {
      // Load provider profile
      const { data: profileData, error: profileError } = await supabase
        .from('provider_profiles')
        .select('*, services(*)')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      if (profileData) {
        setProfile(profileData);
        setFormData({
          bio: profileData.bio || '',
          hourly_rate: profileData.hourly_rate || 0,
        });
        setSelectedServices(profileData.services?.map((s: Service) => s.id) || []);
      }

      // Load availability
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('provider_availability')
        .select('*')
        .eq('provider_id', user?.id);

      if (availabilityError) throw availabilityError;
      setAvailability(availabilityData || []);

      setLoading(false);
    } catch (error) {
      console.error('Error loading provider data:', error);
      toast.error('Failed to load provider data');
      setLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Failed to load services');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Update provider profile
      const { error: profileError } = await supabase
        .from('provider_profiles')
        .update({
          bio: formData.bio,
          hourly_rate: formData.hourly_rate,
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Update provider services
      await supabase
        .from('provider_services')
        .delete()
        .eq('provider_id', user?.id);

      if (selectedServices.length > 0) {
        const { error: servicesError } = await supabase
          .from('provider_services')
          .insert(
            selectedServices.map(serviceId => ({
              provider_id: user?.id,
              service_id: serviceId,
            }))
          );

        if (servicesError) throw servicesError;
      }

      toast.success('Profile updated successfully');
      loadProviderData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityUpdate = async (
    day: DayOfWeek,
    startTime: string,
    endTime: string
  ) => {
    try {
      if (!startTime || !endTime) {
        // Delete availability for this day
        const { error } = await supabase
          .from('provider_availability')
          .delete()
          .eq('provider_id', user?.id)
          .eq('day_of_week', day);

        if (error) throw error;
      } else {
        // Upsert availability
        const { error } = await supabase
          .from('provider_availability')
          .upsert({
            provider_id: user?.id,
            day_of_week: day,
            start_time: startTime,
            end_time: endTime,
          });

        if (error) throw error;
      }

      toast.success('Availability updated');
      loadProviderData();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const getAvailabilityForDay = (day: DayOfWeek) => {
    return availability.find(a => a.day_of_week === day);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Provider Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell clients about yourself and your expertise..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  title="Hourly rate in dollars"
                  placeholder="Enter your hourly rate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: parseFloat(e.target.value) }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices(prev => [...prev, service.id]);
                          } else {
                            setSelectedServices(prev => prev.filter(id => id !== service.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Availability Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Availability Schedule</h2>
          <div className="space-y-4">
            {daysOfWeek.map((day) => {
              const dayAvailability = getAvailabilityForDay(day);
              return (
                <div key={day} className="flex items-center space-x-4">
                  <span className="w-24">{day}</span>
                  <input
                    type="time"
                    aria-label={`${day} start time`}
                    title={`${day} start time`}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={dayAvailability?.start_time || ''}
                    onChange={(e) => {
                      const endTime = dayAvailability?.end_time || '17:00';
                      handleAvailabilityUpdate(day, e.target.value, endTime);
                    }}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    aria-label={`${day} end time`}
                    title={`${day} end time`}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={dayAvailability?.end_time || ''}
                    onChange={(e) => {
                      const startTime = dayAvailability?.start_time || '09:00';
                      handleAvailabilityUpdate(day, startTime, e.target.value);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="text-2xl font-bold">{profile?.rating.toFixed(1)} / 5.0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Jobs</p>
              <p className="text-2xl font-bold">{profile?.completed_jobs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;