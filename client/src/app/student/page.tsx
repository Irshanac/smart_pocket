import React from "react";
import Image from "next/image";
import Provider from '../../components/HomeProvider'
import Card from "../../components/HomeComp";
const page = () => {
  return (
    <div className="bg-custom-gradient h-screen w-full flex flex-col">
      {/* Main Content Section */}
      <section className="flex flex-col w-3/4 lg:flex-row items-center justify-center mx-auto mt-0">
        {/* Image Container */}
        <div className="relative overflow-hidden min-h-[350px] sm:min-h-[450px] flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
        <div className="h-[200px] w-[200px] bg-buttonBackground absolute  right-0 rounded-3xl rotate-45 -z[8]"></div>
          <Image
            src="/Images/home.png"
            alt="Home illustration showcasing job opportunities"
            width={250}
            height={250}
            className="z-20 rounded-md shadow-lg h-auto w-auto"
          />
        </div>

        {/* Text Content */}
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

      {/* Search Bar */}
      <section className="flex items-center bg-white shadow-lg w-full max-w-2xl border border-gray-300 mx-auto rounded-full">
        {/* Job Title Input */}
        <div className="flex-1 px-4 py-2">
          <input
            type="text"
            placeholder="Search job title"
            aria-label="Search job title"
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Location Input */}
        <div className="flex-1 px-4 py-2">
          <input
            type="text"
            placeholder="Location"
            aria-label="Location"
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Search Button */}
        <button className="bg-buttonBackground text-white px-6 py-2 rounded-full hover:bg-sky-900 focus:outline-none focus:ring focus:ring-blue-300 transition">
          Search
        </button>
      </section>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Play" />
    </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Provider name="Play" description="it is good for the solution"/>
    </div>
    </div>
  );
};

export default page;
