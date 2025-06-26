import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ProviderProfile } from '../../types/supabase';

interface ProviderCardProps {
  provider: ProviderProfile;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { user, rating, completed_jobs, hourly_rate, services } = provider;

  if (!user) return null;

  return (
    <Link
      to={`/providers/${provider.id}`}
      className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-w-3 aspect-h-2">
        <img
          src={user.avatar_url || 'https://via.placeholder.com/300'}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{completed_jobs} jobs</span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          ${hourly_rate}/hour
        </div>

        <div className="flex flex-wrap gap-1">
          {services?.map(ps => ps.service).slice(0, 3).map((service) => (
            <span
              key={service.id}
              className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
            >
              {service.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;