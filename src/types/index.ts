export type UserRole = 'admin' | 'provider' | 'client';

export type ServiceCategory = 'plumbing' | 'electrical' | 'cleaning' | 'carpentry' | 'painting' | 'gardening';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description?: string;
  price: number;
  duration: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  provider_id: string;
  service_id: string;
  date: string;
  time_slot: string;
  status: BookingStatus;
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile {
  id: string;
  bio?: string;
  hourly_rate: number;
  rating: number;
  completed_jobs: number;
  created_at: string;
  updated_at: string;
  availability?: {
    [day: string]: string[];
  };
}


export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  provider_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface FilterOptions {
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: string;
}