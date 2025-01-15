"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/hook/useAppDispatch"; 
import { setUserRole, setUserEmail,serUserName } from "../redux/slices/authSlice"; 
import axiosInstance from "@/lib/axios";
import endPoint from "@/lib/endPoint";
import { useRouter } from "next/navigation";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import InputField from "../components/InputField";
import Button from "../components/Button";


const Login = () => {

  const router = useRouter();
  const initialValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log(values)
      // const response = await axios.post("http://localhost:3500/api/users/login", values);
      const response = await axiosInstance.post(endPoint.AUTH.LOGIN,values);
      console.log(response)
      const { role, email,name } = response.data.user;
      dispatch(setUserRole(role));
      dispatch(setUserEmail(email));
      dispatch(serUserName(name));

      if (role === "Student") router.push("/student");
      else if (role === "Provider") router.push("/provider");
      else if (role === "Admin") router.push("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };


  return (
    <div className="bg-custom-gradient h-screen w-full flex items-center justify-center py-5">
      <div className="flex flex-col md:flex-row w-4/5 md:w-3/5 mx-auto h-auto shadow-lg rounded-lg overflow-hidden bg-gray-50 ">
        <div className="w-full md:w-1/2 h-60 md:h-auto">
          <Image
            src="/Images/login.jpeg"
            alt="Registration Illustration"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full bg-gray-100 md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-teal-900">
            Login to your Account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(
              { touched, errors } 
            ) => (
              <Form className="space-y-4">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
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
                <div className="flex flex-row items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      className="mr-2"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a
                      href="/Reset-password"
                      className="text-sm text-teal-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button type="submit">Login</Button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center space-x-2">
      <p className="text-buttonBackground">Not Registered Yet?</p>
      <Link href="/" className="text-blue-500 hover:underline">
      Create an account
      </Link>
    </div>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
