import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { formatCurrency, getInitials } from '../../lib/utils';
import { Provider } from '../../types';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="card overflow-hidden transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center gap-4">
          {provider.avatar ? (
            <img 
              src={provider.avatar} 
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-medium text-lg">
              {getInitials(provider.name)}
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{provider.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({provider.completedJobs} jobs)</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <span className="mr-2">{formatCurrency(provider.hourlyRate)}/hr</span>
              <span>•</span>
              <div className="flex flex-wrap gap-1 ml-2">
                {provider.services.slice(0, 2).map((service, index) => (
                  <span key={index} className="bg-muted rounded-full px-2 py-0.5 text-xs">
                    {service}
                  </span>
                ))}
                {provider.services.length > 2 && (
                  <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                    +{provider.services.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
          {provider.bio}
        </p>
        
        <div className="mt-4 flex items-center text-sm text-success">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Background checked</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <Link to={`/providers/${provider.id}`} className="btn btn-outline btn-sm">
            View Profile
          </Link>
          <Link to={`/booking?provider=${provider.id}`} className="btn btn-primary btn-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;