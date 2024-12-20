'use client'

import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="mt-10 lg:mt-0">
      <div className="flex items-center justify-center mx-auto lg:mx-0 h-12 w-12 rounded-md bg-orange-500 text-white">
        {icon}
      </div>
      <div className="grid grid-cols-1 lg:grid-rows-1 mt-5">
        <h2 className="text-lg font-medium mx-auto lg:mx-0 text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-base mx-auto lg:mx-0 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;