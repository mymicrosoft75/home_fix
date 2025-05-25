import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Shield, Award, Clock, Users } from 'lucide-react';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import ServiceCard from '../components/ui/ServiceCard';
import ProviderCard from '../components/ui/ProviderCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import HowItWorks from '../components/ui/HowItWorks';
import { Service, Provider, ServiceCategory } from '../types';

// Mock data - would come from API in real app
const featuredServices: Service[] = [
  {
    id: '1',
    name: 'Pipe Repair & Installation',
    category: 'plumbing',
    description: 'Expert repair and installation of all types of pipes including PVC, copper, and galvanized steel.',
    price: 85,
    image: 'https://images.pexels.com/photos/5257518/pexels-photo-5257518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 2,
  },
  {
    id: '2',
    name: 'Electrical Panel Upgrade',
    category: 'electrical',
    description: 'Upgrade your electrical panel to safely handle your home\'s power needs with modern circuit breakers.',
    price: 250,
    image: 'https://images.pexels.com/photos/2062048/pexels-photo-2062048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 4,
  },
  {
    id: '3',
    name: 'Deep House Cleaning',
    category: 'cleaning',
    description: 'Comprehensive cleaning service covering all rooms, bathrooms, kitchen, and common areas.',
    price: 120,
    image: 'https://images.pexels.com/photos/4107112/pexels-photo-4107112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 3,
  },
  {
    id: '4',
    name: 'Interior Wall Painting',
    category: 'painting',
    description: 'Professional interior painting with premium paint and detailed preparation for flawless results.',
    price: 180,
    image: 'https://images.pexels.com/photos/6444266/pexels-photo-6444266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 6,
  },
];

const topProviders: Provider[] = [
  {
    id: '1',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'provider',
    services: ['plumbing', 'electrical'],
    bio: 'Professional plumber with 15 years of experience in residential and commercial projects.',
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
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    role: 'provider',
    services: ['cleaning', 'painting'],
    bio: 'Detail-oriented cleaning professional specializing in eco-friendly products and methods.',
    rating: 4.8,
    hourlyRate: 35,
    availability: {
      Monday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
      Wednesday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
      Friday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    },
    completedJobs: 157,
    createdAt: '2022-03-22',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david@example.com',
    role: 'provider',
    services: ['carpentry', 'electrical'],
    bio: 'Licensed electrician and carpenter with expertise in home renovations and custom furniture.',
    rating: 4.7,
    hourlyRate: 50,
    availability: {
      Tuesday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
      Thursday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
      Saturday: ['9:00', '10:00', '11:00', '13:00', '14:00'],
    },
    completedJobs: 129,
    createdAt: '2022-05-10',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const testimonials = [
  {
    name: 'Emily Wilson',
    service: 'Plumbing Services',
    rating: 5,
    date: 'June 12, 2023',
    text: 'The plumber arrived on time and fixed our leaking pipe quickly. Very professional service and reasonable pricing.',
  },
  {
    name: 'Michael Davis',
    service: 'Electrical Repair',
    rating: 5,
    date: 'May 3, 2023',
    text: 'Had an electrical issue that was causing breakers to trip. The electrician diagnosed and fixed the problem in one visit. Great service!',
  },
  {
    name: 'Jennifer Lopez',
    service: 'House Cleaning',
    rating: 4,
    date: 'July 21, 2023',
    text: 'The cleaning team did an excellent job. Our house hasn\'t been this clean in years. Will definitely book again.',
  },
];

const categoryCount = {
  plumbing: 24,
  electrical: 18,
  cleaning: 15,
  carpentry: 12,
  painting: 10,
  gardening: 8,
};

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-r from-blue-50 to-slate-50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Home Services <br />
              <span className="text-primary">On Demand</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with skilled professionals for all your home repair and maintenance needs.
            </p>

            <form className="max-w-xl mx-auto">
              <div className="bg-white p-2 rounded-lg shadow-lg flex">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full form-input border-0 focus:ring-0"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </form>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">Verified Experts</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">Guaranteed Quality</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">24/7 Availability</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">5000+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Service Categories</h2>
              <p className="text-muted-foreground">Browse services by category to find what you need</p>
            </div>
            <Link to="/services" className="text-primary font-medium flex items-center hover:underline">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categoryCount).map(([category, count]) => (
              <ServiceCategoryCard 
                key={category}
                category={category as ServiceCategory}
                count={count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Services */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
              <p className="text-muted-foreground">Our most popular services that customers love</p>
            </div>
            <Link to="/services" className="text-primary font-medium flex items-center hover:underline">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Service Provider?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied customers who have found reliable home service professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn bg-white text-primary hover:bg-gray-100 btn-lg">
                Browse Services
              </Link>
              <Link to="/register" className="btn bg-accent text-white hover:bg-accent/90 btn-lg">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Service Providers</h2>
              <p className="text-muted-foreground">Trusted professionals with exceptional ratings</p>
            </div>
            <Link to="/providers" className="text-primary font-medium flex items-center hover:underline">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Read testimonials from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                service={testimonial.service}
                rating={testimonial.rating}
                date={testimonial.date}
                text={testimonial.text}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/testimonials" className="btn btn-outline">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get Our Mobile App</h2>
              <p className="text-xl opacity-90 mb-6">
                Book services, track appointments, and manage payments on the go with our mobile app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn bg-white text-primary hover:bg-gray-100">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39069V8.92275H19.1042V10.5498H17.5227V12.0818H19.1042V13.7088H17.5227V15.2409H19.1042V16.8679H17.5227V19C17.5227 19.2652 17.4174 19.5196 17.2299 19.7071C17.0424 19.8946 16.788 20 16.5227 20H5.00001C4.73479 20 4.48044 19.8946 4.2929 19.7071C4.10536 19.5196 4.00001 19.2652 4.00001 19V5C4.00001 4.73478 4.10536 4.48043 4.2929 4.29289C4.48044 4.10536 4.73479 4 5.00001 4H16.5227C16.788 4 17.0424 4.10536 17.2299 4.29289C17.4174 4.48043 17.5227 4.73478 17.5227 5V7.39069Z" fill="currentColor"/>
                  </svg>
                  Play Store
                </button>
                <button className="btn bg-white text-primary hover:bg-gray-100">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 12.5C17.5 10.29 16.26 8.23 14.44 7.11C14.14 6.91 13.76 7 13.56 7.3C13.36 7.6 13.44 8 13.74 8.2C15.23 9.12 16.23 10.8 16.23 12.69C16.23 14.58 15.23 16.26 13.74 17.18C13.44 17.38 13.36 17.77 13.56 18.07C13.68 18.26 13.87 18.36 14.08 18.36C14.21 18.36 14.34 18.32 14.44 18.25C16.25 17.14 17.5 15 17.5 12.5Z" fill="currentColor"/>
                    <path d="M12.8499 7.72C12.9899 7.57 13.0599 7.37 13.0599 7.16C13.0599 6.95 12.9899 6.75 12.8499 6.6C12.5599 6.31 12.0799 6.31 11.7899 6.6L7.99988 10.39L4.21988 6.6C3.92988 6.31 3.44988 6.31 3.15988 6.6C2.86988 6.89 2.86988 7.37 3.15988 7.66L6.93988 11.45L3.15988 15.24C2.86988 15.53 2.86988 16.01 3.15988 16.3C3.29988 16.45 3.49988 16.52 3.69988 16.52C3.89988 16.52 4.09988 16.45 4.23988 16.3L7.99988 12.51L11.7899 16.3C11.9299 16.45 12.1299 16.52 12.3299 16.52C12.5299 16.52 12.7299 16.45 12.8699 16.3C13.1599 16.01 13.1599 15.53 12.8699 15.24L9.05988 11.45L12.8499 7.72Z" fill="currentColor"/>
                  </svg>
                  App Store
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.pexels.com/photos/6686455/pexels-photo-6686455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="HomeFix Mobile App" 
                className="max-w-xs lg:max-w-sm rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;