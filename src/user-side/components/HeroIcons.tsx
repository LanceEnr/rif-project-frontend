import React from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

const HeroIcons: React.FC = () => {
  return (
    <>
      <section class="bg-white ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <h2 class="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 lg:mb-16 dark:text-white md:text-4xl">
            What do we have to offer?{" "}
          </h2>
          <div class="flex  flex-wrap -mx-4">
            <div class="w-full md:w-1/3 px-4 mb-8">
              <div class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                  <span class="grid h-20 w-20 place-items-center rounded-full bg-yellow-500 transition-all duration-300 group-hover:bg-yellow-400">
                    <FaMagnifyingGlass className="h-10 w-10 text-white transition-all" />
                  </span>
                  <div class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <h3 class="text-xl font-bold ">
                      Comprehensive Risk Monitoring
                    </h3>
                    <p>Streamlining risk identification and tracking.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-4 mb-8">
              <div class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                  <span class="grid h-20 w-20 place-items-center rounded-full bg-yellow-500 transition-all duration-300 group-hover:bg-yellow-400">
                    <FaUsersCog className="h-10 w-10 text-white transition-all" />
                  </span>
                  <div class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <h3 class="text-xl font-bold ">Admin and User Functions</h3>
                    <p>
                      Tailored features for admins and users for enhanced risk
                      management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-4 mb-8">
              <div class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                  <span class="grid h-20 w-20 place-items-center rounded-full bg-yellow-500 transition-all duration-300 group-hover:bg-yellow-400">
                    <FaUserCheck className="h-10 w-10 text-white transition-all" />
                  </span>
                  <div class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <h3 class="text-xl font-bold ">
                      Efficient and User-Friendly
                    </h3>
                    <p>
                      Combining efficiency with user-friendly features for a
                      seamless experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroIcons;
