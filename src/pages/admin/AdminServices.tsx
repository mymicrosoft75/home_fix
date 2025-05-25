import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Clock,
  Tag
} from 'lucide-react';
import { Service, ServiceCategory } from '../../types';
import { formatCurrency } from '../../lib/utils';

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

const AdminServices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Filter services based on search term and category
  const filteredServices = services.filter((service) => {
    // Search filter
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Pagination
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the state change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getCategoryColor = (category: ServiceCategory) => {
    switch (category) {
      case 'plumbing':
        return 'bg-blue-100 text-blue-800';
      case 'electrical':
        return 'bg-yellow-100 text-yellow-800';
      case 'cleaning':
        return 'bg-cyan-100 text-cyan-800';
      case 'carpentry':
        return 'bg-amber-100 text-amber-800';
      case 'painting':
        return 'bg-violet-100 text-violet-800';
      case 'gardening':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">
            Manage your platform's service offerings and categories.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full md:max-w-xs"
              />
            </form>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ServiceCategory | 'all')}
                className="form-input"
              >
                <option value="all">All Categories</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="carpentry">Carpentry</option>
                <option value="painting">Painting</option>
                <option value="gardening">Gardening</option>
              </select>
              
              <button className="btn btn-outline flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden">
          {currentServices.map((service) => (
            <div key={service.id} className="p-4 border-b last:border-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded-md hover:bg-muted" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-muted" title="Edit Service">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-muted text-error" title="Delete Service">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="font-medium">{formatCurrency(service.price)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{service.duration} hour{service.duration > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstService + 1}-{Math.min(indexOfLastService, filteredServices.length)} of {filteredServices.length} services
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNumber = currentPage;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                    currentPage === pageNumber 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;