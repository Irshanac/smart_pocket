"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Card from "../../components/HomeComp";
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobCounts ,fetchProviderCount} from '../../redux/slices/studentsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import HomeProvider from "@/components/HomeProvider";
import LoadingModal from "@/components/LoadingModal";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { jobCounts,providerCounts,loading,error } = useSelector((state: RootState) => state.student);
  useEffect(() => {
    dispatch(fetchJobCounts());
    dispatch(fetchProviderCount());
  }, [dispatch]);

  if (loading) {
    return <LoadingModal isVisible={loading} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(jobCounts.length,"job Count lenght")
  console.log(jobCounts,"job count")
  console.log(providerCounts,"provider")
  console.log(providerCounts.length,"provider length")
  return (
    <div className="bg-custom-gradient h-screen w-full flex flex-col">
   
      <section className="flex flex-col w-3/4 lg:flex-row items-center justify-center mx-auto mt-0">
      
        <div className="relative overflow-hidden min-h-[350px] sm:min-h-[450px] flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
          <div className="h-[200px] w-[200px] bg-buttonBackground absolute  right-0 rounded-3xl rotate-45 -z[8]"></div>
          <Image
            src="/Images/home.png"
            alt="Home illustration showcasing job opportunities"
            width={250}
            height={250}
            className="z-20 rounded-md shadow-lg h-auto w-auto"
          />
        </div>

        <article className="flex items-center justify-center w-full lg:w-1/2 p-4 text-center">
          <div className="w-3/4">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-buttonBackground mb-4">
              Join Us & Explore
            </h1>
            <h3 className="text-2xl font-bold text-buttonBackground text-center">
              Thousands of Part-Time Jobs for Students
            </h3>
            <p className="text-gray-600 text-justify">
              Find part-time jobs, employment & career opportunities in retail,
              food service, tutoring, internships, and more. Gain valuable work
              experience, build essential skills, and earn money while studying.
              Browse available jobs or sign up for job alerts today!
            </p>
          </div>
        </article>
      </section>

      {/* Search ...... */}
      <section className="flex items-center bg-white shadow-lg w-full max-w-2xl border border-gray-300 mx-auto rounded-full">
       
        <div className="flex-1 px-4 py-2">
          <input
            type="text"
            placeholder="Search job title"
            aria-label="Search job title"
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <div className="flex-1 px-4 py-2">
          <input
            type="text"
            placeholder="Location"
            aria-label="Location"
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>
        <button className="bg-buttonBackground text-white px-6 py-2 rounded-full hover:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-300 transition">
          Search
        </button>
      </section>

      {jobCounts.length > 0 && (
  <div className="grid grid-cols-5 justify-center items-center">
    {jobCounts.map((job, index) => (
      <Card
        key={`${job._id}-${index}`}  
        title={job._id}
        count={job.count}
      />
    ))}
  </div>
)}

{providerCounts.length > 0 && (
  <div className="flex justify-center items-center">
    {providerCounts.map((provider) => (
      <HomeProvider
        key={provider.name}  
        name={provider.name}
        description={provider.description}
      />
    ))}
  </div>
)}

    </div>
  );
};

export default Page;
