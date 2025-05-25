import React from 'react';
import { Star } from 'lucide-react';
import { cn, getInitials } from '../../lib/utils';

interface TestimonialCardProps {
  name: string;
  service: string;
  image?: string;
  rating: number;
  date: string;
  text: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  service,
  image,
  rating,
  date,
  text,
  className,
}) => {
  return (
    <div className={cn("card p-6", className)}>
      <div className="flex items-center mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-lg mr-4">
            {getInitials(name)}
          </div>
        )}
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">{date}</span>
          </div>
        </div>
      </div>

      <p className="text-sm mb-3 italic">"{text}"</p>

      <div className="text-xs text-muted-foreground pt-3 border-t border-border">
        Service: <span className="font-medium text-foreground">{service}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;