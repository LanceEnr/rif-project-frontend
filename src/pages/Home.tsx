import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <section className="bg-white my-32">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              <span className="text-gray-500">Comprehensive</span>
              <br />
              <span className="">Risk Monitoring</span>
              <br />
              <span className="text-yellow-500">Platform</span>
            </h1>

            <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
              <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
              <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
            </p>  
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-yellow-500 hover:bg-primary-800 focus:ring-4 focus:ring-yellow-300">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-yellow-500 border-2 border-yellow-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
              Frequently Asked Questions
            </a> 
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <div className="relative rounded-lg overflow-hidden">
              <img src="https://c0.wallpaperflare.com/preview/453/640/998/building-philippines-ust.jpg" alt="mockup" className="w-full h-full"/>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 opacity-50"></div>
            </div>
          </div>                
        </div>
      </section>
    </>
  ) 
}

export default Home;
