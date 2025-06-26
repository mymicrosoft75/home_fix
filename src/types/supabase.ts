export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'client' | 'provider' | 'admin'
export type ServiceCategory = 'plumbing' | 'electrical' | 'cleaning' | 'carpentry' | 'painting' | 'gardening'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  address?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description?: string
  price: number
  duration: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface ProviderProfile {
  id: string
  bio?: string
  hourly_rate: number
  rating: number
  completed_jobs: number
  created_at: string
  updated_at: string
  user?: User
  services?: Service[]
  availability?: ProviderAvailability[]
}

export interface ProviderService {
  provider_id: string
  service_id: string
  provider?: ProviderProfile
  service?: Service
}

export interface ProviderAvailability {
  provider_id: string
  day_of_week: DayOfWeek
  start_time: string
  end_time: string
  provider?: ProviderProfile
}

export interface Booking {
  id: string
  client_id: string
  provider_id: string
  service_id: string
  date: string
  time_slot: string
  status: BookingStatus
  total: number
  notes?: string
  created_at: string
  updated_at: string
  client?: User
  provider?: ProviderProfile
  service?: Service
}

export interface Review {
  id: string
  booking_id: string
  client_id: string
  provider_id: string
  rating: number
  comment?: string
  created_at: string
  booking?: Booking
  client?: User
  provider?: ProviderProfile
}

export type Tables = Database['public']['Tables']
export type Enums = Database['public']['Enums']

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'provider' | 'client'
          phone: string | null
          address: string | null
          service_categories: string[] | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role?: 'admin' | 'provider' | 'client'
          phone?: string | null
          address?: string | null
          service_categories?: string[] | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'provider' | 'client'
          phone?: string | null
          address?: string | null
          service_categories?: string[] | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          price: number
          duration: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          price: number
          duration: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          price?: number
          duration?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      provider_profiles: {
        Row: ProviderProfile
        Insert: Omit<ProviderProfile, 'created_at' | 'updated_at' | 'rating' | 'completed_jobs'>
        Update: Partial<Omit<ProviderProfile, 'id' | 'created_at' | 'updated_at'>>
      }
      provider_services: {
        Row: ProviderService
        Insert: ProviderService
        Update: Partial<ProviderService>
      }
      provider_availability: {
        Row: ProviderAvailability
        Insert: ProviderAvailability
        Update: Partial<ProviderAvailability>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      service_category: ServiceCategory
      booking_status: BookingStatus
    }
  }
} 