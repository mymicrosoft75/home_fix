import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link 
      to={`/services/${service.id}`}
      className="card group overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium py-1 px-2 rounded-full">
          {service.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{service.duration} hr</span>
          </div>
          
          <span className="font-semibold text-lg">
            {formatCurrency(service.price)}
          </span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">4.8</span>
            <span className="text-xs text-muted-foreground ml-1">(124)</span>
          </div>
          <span className="text-primary text-sm font-medium group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;