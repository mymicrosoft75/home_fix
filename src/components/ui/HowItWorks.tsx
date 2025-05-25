import React from 'react';
import { Search, Calendar, PenTool as Tool, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Find a Service',
    description: 'Browse our range of professional home services.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Book an Appointment',
    description: 'Choose a convenient date and time for your service.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <Tool className="h-8 w-8" />,
    title: 'Get it Fixed',
    description: 'Our professional will arrive and complete the service.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Enjoy & Review',
    description: 'Rate your experience and enjoy your fixed home.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How HomeFix Works</h2>
          <p className="text-muted-foreground">
            Get your home services done in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="card bg-white p-6 text-center transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center`}>
                  {step.icon}
                </div>
              </div>
              <div className="relative mb-6 mt-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-full w-full h-0.5 bg-gray-200 -ml-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;