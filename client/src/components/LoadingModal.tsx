import React from 'react';

interface LoadingModalProps {
  isVisible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <div className="loader mb-4"></div> {/* Add your loader spinner here */}
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
