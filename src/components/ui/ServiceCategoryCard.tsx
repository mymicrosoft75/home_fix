import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '../../types/supabase';

interface ServiceCategoryCardProps {
  name: string;
  icon: string;
  category: ServiceCategory;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ name, icon, category }) => {
  return (
    <Link
      to={`/services?category=${category}`}
      className="block bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
    >
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
  );
};

export default ServiceCategoryCard;