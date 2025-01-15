import React from 'react';
import Image from 'next/image';
interface SuccessModalProps {
  isVisible: boolean;
  message: string;
  image?: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, message, image, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        {image && <Image src={image} alt="Success" width={20} height={40} className="w-16 h-16 mx-auto mb-4" />}
        <h2 className="text-xl font-bold mb-4">Success</h2>
        <p>{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
