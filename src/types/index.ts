export type UserRole = 'client' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Provider extends User {
  services: string[];
  bio: string;
  rating: number;
  hourlyRate: number;
  availability: {
    [day: string]: string[]; // e.g., { "Monday": ["9:00", "10:00", "11:00"] }
  };
  completedJobs: number;
}

export type ServiceCategory = 'plumbing' | 'electrical' | 'cleaning' | 'carpentry' | 'painting' | 'gardening';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  image: string;
  duration: number; // in hours
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  total: number;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  providerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface FilterOptions {
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: string;
}