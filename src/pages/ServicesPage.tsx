import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import ServiceCard from '../components/ui/ServiceCard';
import { Service, FilterOptions, ServiceCategory } from '../types';

// Mock data - would come from API in real app
const services: Service[] = [
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
  {
    id: '5',
    name: 'Bathroom Plumbing Services',
    category: 'plumbing',
    description: 'Full bathroom plumbing services including toilet, sink, shower, and bathtub installation or repair.',
    price: 95,
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 2,
  },
  {
    id: '6',
    name: 'Light Fixture Installation',
    category: 'electrical',
    description: 'Professional installation of ceiling fans, chandeliers, recessed lighting, and other light fixtures.',
    price: 75,
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 1,
  },
  {
    id: '7',
    name: 'Cabinet Installation',
    category: 'carpentry',
    description: 'Custom cabinet installation for kitchens, bathrooms, and other spaces with precise measurements.',
    price: 320,
    image: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 8,
  },
  {
    id: '8',
    name: 'Garden Maintenance',
    category: 'gardening',
    description: 'Regular garden maintenance including lawn mowing, pruning, weeding, and plant care.',
    price: 60,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 2,
  },
];

const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ServiceCategory | null;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: categoryParam || undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter services based on category and search term
  const filteredServices = services.filter((service) => {
    // Category filter
    if (filterOptions.category && service.category !== filterOptions.category) {
      return false;
    }
    
    // Price range filter
    if (filterOptions.minPrice !== undefined && service.price < filterOptions.minPrice) {
      return false;
    }
    if (filterOptions.maxPrice !== undefined && service.price > filterOptions.maxPrice) {
      return false;
    }
    
    // Search term filter
    if (searchTerm && !service.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !service.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is handled automatically by the state change
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilterOptions((prev) => ({ ...prev, [key]: value }));
    
    // Update URL params for category
    if (key === 'category') {
      if (value) {
        searchParams.set('category', value);
      } else {
        searchParams.delete('category');
      }
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setFilterOptions({});
    setSearchTerm('');
    setSearchParams({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="pt-10 pb-20">
      <div className="container">
        {/* Page Header */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our wide range of professional home services. From plumbing and electrical 
            to cleaning and carpentry, we've got all your home needs covered.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <button 
                type="button" 
                onClick={toggleFilters} 
                className="btn btn-outline flex items-center"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </form>

            {/* Filter Controls */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filterOptions.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                    className="form-input"
                  >
                    <option value="">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="gardening">Gardening</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterOptions.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="form-input"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterOptions.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button 
                    type="button" 
                    onClick={clearFilters}
                    className="btn btn-outline w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(filterOptions.category || filterOptions.minPrice || filterOptions.maxPrice || searchTerm) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm font-medium">Active Filters:</span>
                
                {filterOptions.category && (
                  <span className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
                    Category: {filterOptions.category}
                    <button 
                      onClick={() => handleFilterChange('category', undefined)} 
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {(filterOptions.minPrice || filterOptions.maxPrice) && (
                  <span className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
                    Price: {filterOptions.minPrice || '0'} - {filterOptions.maxPrice || '∞'}
                    <button 
                      onClick={() => {
                        handleFilterChange('minPrice', undefined);
                        handleFilterChange('maxPrice', undefined);
                      }} 
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {searchTerm && (
                  <span className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Service Listing */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Available
            </h2>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;