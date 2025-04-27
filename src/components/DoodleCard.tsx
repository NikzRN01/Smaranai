import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type DoodleCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children?: React.ReactNode;
};

const DoodleCard = ({
  title,
  description,
  icon,
  to,
  onClick,
  className,
  children
}: DoodleCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    
    if (to) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <div
      className={cn(
        'card-doodle flex flex-col p-6 cursor-pointer transition-all duration-300 bg-gradient-to-br from-purple-900 to-blue-900 shadow-xl border border-gray-700 rounded-xl overflow-hidden',
        'hover:shadow-neon-purple',
        'hover:outline hover:outline-offset-2 hover:outline-1 outline-neon-purple',
        'group',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="flex w-full items-center mb-4">
        {icon && (
          <div className="mr-3 text-white group-hover:animate-pulse">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
      {children}
    </div>
  );
};

export default DoodleCard;
