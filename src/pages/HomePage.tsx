import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Shield, Award, Clock, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Service, ProviderProfile, ServiceCategory } from '../types/supabase';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import ServiceCard from '../components/ui/ServiceCard';
import ProviderCard from '../components/ui/ProviderCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import HowItWorks from '../components/ui/HowItWorks';

const HomePage: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [topProviders, setTopProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      setLoading(true);

      // Fetch featured services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .limit(6);

      if (servicesError) throw servicesError;

      // Fetch top-rated providers with their services
      const { data: providersData, error: providersError } = await supabase
        .from('provider_profiles')
        .select(`
          *,
          user:users(*),
          services:provider_services(services(*))
        `)
        .order('rating', { ascending: false })
        .limit(4);

      if (providersError) throw providersError;

      setFeaturedServices(servicesData || []);
      setTopProviders(providersData || []);
    } catch (error) {
      console.error('Error loading featured content:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories: Array<{
    name: string;
    icon: string;
    category: ServiceCategory;
  }> = [
    { name: 'Plumbing',  icon: '🔧', category: 'plumbing' },
    { name: 'Electrical', icon: '⚡', category: 'electrical' },
    { name: 'Cleaning', icon: '🧹', category: 'cleaning' },
    { name: 'Carpentry', icon: '🔨', category: 'carpentry' },
    { name: 'Painting', icon: '🎨', category: 'painting' },
    { name: 'Gardening', icon: '🌿', category: 'gardening' },
  ];

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
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

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <ServiceCategoryCard
                key={category.category}
                name={category.name}
                icon={category.icon}
                category={category.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Rated Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="John Smith"
              image="https://randomuser.me/api/portraits/men/1.jpg"
              text="Excellent service! The plumber was professional and fixed our issue quickly."
              rating={5}
            />
            <TestimonialCard
              name="Sarah Johnson"
              image="https://randomuser.me/api/portraits/women/1.jpg"
              text="Very reliable and professional service. Would definitely recommend!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Brown"
              image="https://randomuser.me/api/portraits/men/2.jpg"
              text="Great experience with the electrician. Fair pricing and excellent work."
              rating={4}
            />
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