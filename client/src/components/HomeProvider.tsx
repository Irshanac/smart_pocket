import React from "react";

interface CardProps {
  name: string;
  description: string;

}

const HomeProvider: React.FC<CardProps> = ({ name, description }) => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer w-40">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">{name}</h5>
        <p className="text-slate-600 leading-normal font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HomeProvider;
