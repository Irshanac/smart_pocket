import React from "react";
import Image from "next/image";
import HomeComp from '../../components/HomeComp'
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
      <div className="flex justify-center items-center">
      <HomeComp
        title="Play"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            width="50"
            viewBox="0 0 76 77"
          >
            <path
              fillRule="nonzero"
              fill="#3F9CBB"
              d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
            ></path>
          </svg>
        }
      />
    </div>
    </div>
  );
};

export default page;
