"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import endPoint from "@/lib/endPoint";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import LoadingModal from "@/components/LoadingModal";
const Registration = () => {
  const router =useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successImage, setSuccessImage] = useState('');
  const initialValues = {
    name: "",
    email: "",
    password: "",
    id_proof: null,
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    id_proof: Yup.mixed().required("ID proof is required"),
  });

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    setIsLoading(true); 
    try {
      const formData = new FormData();
  
     
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
  
      console.log(values.id_proof,"id proof")
      if (values.id_proof) {
        formData.append("id_proof", values.id_proof); 
      }
  
  
      const response = await axiosInstance.post(endPoint.AUTH.REGISTRATION, formData);
  
     
      setSuccessMessage(response.data.message); 
      setSuccessImage("/Images/login.jpeg"); 
      setIsSuccess(true); 
      setTimeout(() => {
        setIsSuccess(false);
        router.push('/'); 
      }, 3000);
  
    } catch (error: any) {
      console.error("Error during registration:", error);
  
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
  
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleCloseSuccessModal = () => {
    setIsSuccess(false);
    router.push('/'); 
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="bg-custom-gradient h-screen w-full flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row h-auto shadow-lg rounded-lg overflow-hidden bg-gray-50 mx-auto md:px-13 w-3/5">
        <div className="w-full md:w-1/2 h-full">
          <Image
            src="/Images/registration.jpeg"
            alt="Registration Illustration"
            width={1200}
            height={800}
            className="h-full object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create an Account
          </h2>

          <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, touched, errors }) => (
        <Form className="space-y-4">
          {/* Name Input */}
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />

          {/* Email Input */}
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />

          {/* ID Proof Input */}
          <div className="mb-4">
            <label
              htmlFor="id_proof"
              className="block text-sm font-bold text-buttonBackground"
            >
              ID Proof
            </label>
            <input
              id="id_proof"
              name="id_proof"
              type="file"
              onChange={(e) => {
                if (e.currentTarget.files) {
                  setFieldValue("id_proof", e.currentTarget.files[0]);
                }
              }}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                touched.id_proof && errors.id_proof
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-sky-900 focus:ring-indigo-700 focus:border-indigo-700"
              }`}
            />
            <ErrorMessage
              name="id_proof"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-buttonBackground"
            >
              Password
            </label>
            <div className="relative">
              <Field
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className={`mt-1 block w-full px-3 py-2 border ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-sky-900 focus:ring-indigo-700 focus:border-indigo-700"
                } rounded-md shadow-sm focus:outline-none sm:text-sm pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <IoMdEye className="h-5 w-5 text-black" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-black" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-end mb-4">
            <Field type="checkbox" name="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <Button type="submit">Register</Button>
        </Form>
      )}
    </Formik>
          <div className="flex justify-center items-center space-x-2">
      <p className="text-buttonBackground">Already have an account?</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Login
      </Link>
      <LoadingModal isVisible={isLoading} />
      <SuccessModal
        isVisible={isSuccess}
        message={successMessage}
        image={successImage}
        onClose={handleCloseSuccessModal}
      />
    </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
