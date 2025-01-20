import React from "react";
import Image from "next/image";

interface CardProps { 
  title: string;
  count: number;
}

const Card: React.FC<CardProps> = ({  title, count }) => {
  return (
    <div className="w-52 h-auto rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow py-5">
      <div className="img-section bg-indigo-300 h-12 flex items-center justify-center transition-transform transform hover:scale-110">
        <Image
          src="/job.svg"
          alt="Job icon"
          width={30}
          height={30}
        />
      </div>
      <div className="p-4 bg-slate-400 text-white rounded-b-lg space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-l font-bold text-buttonBackground">{count}</h3>
          <div className="flex space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
          </div>
        </div>
        <h2 className="text-l font-bold text-buttonBackground">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
