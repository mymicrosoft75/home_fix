import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Star, 
  DollarSign, 
  CheckCircle, 
  ThumbsUp, 
  Calendar,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Service } from '../types';
import TestimonialCard from '../components/ui/TestimonialCard';

// Mock data - would come from API in real app
const services: Service[] = [
  {
    id: '1',
    name: 'Pipe Repair & Installation',
    category: 'plumbing',
    description: 'Expert repair and installation of all types of pipes including PVC, copper, and galvanized steel. Our professional plumbers can handle leaks, blockages, and new installations with precision and care.',
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
    description: 'Upgrade your electrical panel to safely handle your home\'s power needs with modern circuit breakers. Our licensed electricians ensure that your home\'s electrical system meets all safety codes and can handle your current and future power needs.',
    price: 250,
    image_url: 'https://images.pexels.com/photos/2062048/pexels-photo-2062048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 4,
    created_at: "",
    updated_at: ""
  },
];

const testimonials = [
  {
    name: 'Joy Chandra Bormon',
    service: 'Plumbing Services',
    rating: 5,
    date: 'June 12, 2023',
    text: 'The plumber arrived on time and fixed our leaking pipe quickly. Very professional service and reasonable pricing.',
  },
  {
    name: 'Bayzid Mia',
    service: 'Electrical Repair',
    rating: 5,
    date: 'May 3, 2023',
    text: 'Had an electrical issue that was causing breakers to trip. The electrician diagnosed and fixed the problem in one visit. Great service!',
  },
  {
    name: 'Alim',
    service: 'House Cleaning',
    rating: 4,
    date: 'July 21, 2023',
    text: 'The cleaning team did an excellent job. Our house hasn\'t been this clean in years. Will definitely book again.',
  },
];

const faqs = [
  {
    question: 'How quickly can you schedule a service?',
    answer: 'We typically can schedule services within 24-48 hours of your request, depending on availability. For emergencies, we offer same-day service when possible.'
  },
  {
    question: 'Are your service providers insured?',
    answer: 'Yes, all our service providers are fully insured and undergo thorough background checks. We ensure that they meet our high standards for quality and professionalism.'
  },
  {
    question: 'What happens if I need to cancel my appointment?',
    answer: 'You can cancel your appointment up to 24 hours before the scheduled time without any cancellation fee. For cancellations made less than 24 hours in advance, a small fee may apply.'
  },
  {
    question: 'Do you offer any guarantees on your work?',
    answer: 'Yes, we offer a 100% satisfaction guarantee on all our services. If you\'re not completely satisfied, we\'ll make it right or provide a refund for the service.'
  },
];

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'faq'>('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Find the service by ID
  const service = services.find((s) => s.id === id);
  
  if (!service) {
    return (
      <div className="container py-20 text-center">
        <AlertCircle className="h-16 w-16 text-error mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The service you are looking for does not exist or may have been removed.
        </p>
        <Link to="/services" className="btn btn-primary">
          Browse Services
        </Link>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };
  
  return (
    <div className="pt-10 pb-20">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/services" className="hover:text-primary">Services</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{service.name}</span>
        </div>
        
        {/* Service Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={service.image_url} 
              alt={service.name}
              className="w-full h-full object-cover aspect-video"
            />
          </div>
          
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {service.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">4.8</span>
                <span className="text-muted-foreground ml-1">(124 reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="ml-1">{service.duration} hour{service.duration > 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <div className="p-6 bg-muted rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-bold">${service.price}</span>
              </div>
              <Link 
                to={`/booking/${service.id}`} 
                className="btn btn-primary w-full"
              >
                Book Now
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg text-center">
                <ThumbsUp className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm">100% Satisfaction Guarantee</span>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm">Verified Professionals</span>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm">Transparent Pricing</span>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm">Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-16">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>Professional assessment of your requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>Quality materials and parts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>Expert service from verified professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clean-up after service completion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>90-day warranty on workmanship</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>Follow-up inspection if needed</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-border rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-medium mb-2">Book</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule your service online or by phone at a time that works for you.
                    </p>
                  </div>
                  <div className="p-6 border border-border rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-medium mb-2">Connect</h3>
                    <p className="text-sm text-muted-foreground">
                      A verified professional will arrive at your home at the scheduled time.
                    </p>
                  </div>
                  <div className="p-6 border border-border rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-medium mb-2">Complete</h3>
                    <p className="text-sm text-muted-foreground">
                      The service is completed to your satisfaction and you only pay when it's done.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">4.8</span>
                  <span className="text-muted-foreground ml-1">(124 reviews)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              
              <div className="text-center">
                <button className="btn btn-outline">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full p-4 text-left font-medium"
                    >
                      {faq.question}
                      <ChevronRight className={`h-5 w-5 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`} />
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 pt-0 text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Book This Service?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our professional service providers are ready to help. Book now to get started!
          </p>
          <Link to={`/booking/${service.id}`} className="btn bg-white text-primary hover:bg-gray-100">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;