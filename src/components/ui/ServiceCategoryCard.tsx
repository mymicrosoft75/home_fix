import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplet, 
  Lightbulb, 
  Paintbrush, 
  Hammer, 
  Sparkles, 
  ChevronRight,
  Leaf
} from 'lucide-react';
import { ServiceCategory } from '../../types';
import { cn } from '../../lib/utils';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  count: number;
  className?: string;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ 
  category, 
  count,
  className
}) => {
  // Map category to icon and color
  const getCategoryDetails = (category: ServiceCategory) => {
    switch (category) {
      case 'plumbing':
        return { 
          icon: <Droplet className="h-6 w-6" />, 
          color: 'bg-blue-100 text-blue-600',
          title: 'Plumbing'
        };
      case 'electrical':
        return { 
          icon: <Lightbulb className="h-6 w-6" />, 
          color: 'bg-yellow-100 text-yellow-600',
          title: 'Electrical'
        };
      case 'cleaning':
        return { 
          icon: <Sparkles className="h-6 w-6" />, 
          color: 'bg-cyan-100 text-cyan-600',
          title: 'Cleaning'
        };
      case 'carpentry':
        return { 
          icon: <Hammer className="h-6 w-6" />, 
          color: 'bg-amber-100 text-amber-600',
          title: 'Carpentry'
        };
      case 'painting':
        return { 
          icon: <Paintbrush className="h-6 w-6" />, 
          color: 'bg-violet-100 text-violet-600',
          title: 'Painting'
        };
      case 'gardening':
        return { 
          icon: <Leaf className="h-6 w-6" />, 
          color: 'bg-green-100 text-green-600',
          title: 'Gardening'
        };
      default:
        return { 
          icon: <Hammer className="h-6 w-6" />, 
          color: 'bg-gray-100 text-gray-600',
          title: category
        };
    }
  };

  const { icon, color, title } = getCategoryDetails(category);

  return (
    <Link 
      to={`/services?category=${category}`}
      className={cn(
        "card p-5 transition-all hover:shadow-md group",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-full", color)}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'service' : 'services'}
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
};

export default ServiceCategoryCard;