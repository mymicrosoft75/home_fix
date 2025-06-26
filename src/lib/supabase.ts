import { createClient, User } from '@supabase/supabase-js';
import { UserRole } from '../types';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type AuthError = {
  message: string;
};

export type AuthResponse = {
  error: AuthError | null;
  data: {
    user: User | null;
    session: any;
  } | null;
};

export const signUp = async (
  email: string, 
  password: string, 
  userData: {
    full_name: string;
    role: UserRole;
    phone?: string;
    address?: string;
    serviceCategories?: string[];
    bio?: string;
  }
): Promise<AuthResponse> => {
  try {
    // Sign up the user with email confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/verify-otp`
      }
    });

    if (error) {
      return { data: null, error };
    }

    // If signup successful and we have a user, create their profile
    if (data?.user) {
      try {
        await createUserProfile(
          data.user.id,
          email,
          userData.role,
          {
            name: userData.full_name,
            phone: userData.phone,
            address: userData.address,
            service_categories: userData.serviceCategories,
            bio: userData.bio
          }
        );
      } catch (profileError) {
        console.error('Error creating user profile:', profileError);
        // Don't return the profile error as the signup was successful
      }
    }

    return { data, error: null };
  } catch (err: any) {
    return { 
      data: null, 
      error: { 
        message: err.message || 'An error occurred during signup' 
      } 
    };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

export const updateUserProfile = async (userId: string, data: {
  name?: string;
  role?: UserRole;
  phone?: string;
  address?: string;
  serviceCategories?: string[];
  bio?: string;
}) => {
  try {
    const { error } = await supabase.auth.updateUser({
      data
    });

    return { error };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error: { message: 'Failed to update profile' } };
  }
};

export const getUserRole = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return profile?.role;
};

export const getDashboardPath = (role: string | null) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'provider':
      return '/provider';
    case 'client':
      return '/';
    default:
      return '/';
  }
};

export const createUserProfile = async (
  userId: string, 
  email: string, 
  role: string = 'client',
  additionalData: {
    name?: string;
    phone?: string;
    address?: string;
    service_categories?: string[];
    bio?: string;
  } = {}
) => {
  const { error } = await supabase
    .from('users')
    .insert([{
      id: userId,
      email,
      role,
      name: additionalData.name || email.split('@')[0],
      phone: additionalData.phone,
      address: additionalData.address,
      service_categories: additionalData.service_categories,
      bio: additionalData.bio,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const verifyOTP = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  });

  if (error) {
    throw error;
  }

  // Get or create user profile
  if (data.user) {
    try {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (!profile) {
        await createUserProfile(data.user.id, data.user.email || '');
      }

      return { user: data.user, role: profile?.role || 'client' };
    } catch (error) {
      console.error('Error handling user profile:', error);
      throw error;
    }
  }

  return { user: data.user, role: 'client' };
}; 