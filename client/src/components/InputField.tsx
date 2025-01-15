import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, placeholder }) => {
  const [field, meta] = useField(name); 

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-kay-pho-du font-bold text-buttonBackground">
        {label}
      </label>
      <input
        {...field} 
        id={name}
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
          meta.touched && meta.error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-sky-900 focus:ring-indigo-700 focus:border-indigo-700'
        }`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
