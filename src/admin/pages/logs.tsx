import React from "react";

const logs: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-18">
    <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
         Edit History
        </h2>
        <hr className="h-px my-8 border-yellow-500 border-2"/>
            <div className="mx-5 mr-3">
                <ol className="relative border-s border-gray-200">                  
                    <li className="ms-6 mb-10">
                        <span className="absolute flex items-center justify-center w-5 h-5 rounded-full -start-3 ring-8 ring-black">
                            <img className="rounded-full shadow-lg" src="https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.15752-9/426266666_897400942164020_2839335090337105992_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGLimcv9_Yj2mMBnze6GUZUYr6xahBUMYNivrFqEFQxg9L3oSrEXttiPWKNrCWesICUroKorqUYYCVqlmcmzHa6&_nc_ohc=BD3welTvJNsAX9NfCl9&_nc_oc=AQl5R5evzdGcj1nLcNX8hMsdW0NW7nfk6MhP7SG6M5YVL0i-kjG806VdNQ4N_vBtnr4&_nc_ht=scontent.fmnl25-1.fna&oh=03_AdTLQSlSVu7llE405OGNGK2D3vagU2o5cVXg_TKYqRI7_w&oe=660C9984" alt="Lance image"/>
                        </span>
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">04/03/2024 - 10:47am</time>
                            <div className="text-sm font-normal text-gray-500 lex ">Lance has changed <a href="#" className="font-semibold text-blue-600hover:underline">SDA 1</a> from Document 1  <span className="bg-yellow-500 text-white text-xs font-normal me-2 px-2.5 py-0.5 rounded">Edited</span></div>
                        </div>
                    </li>
                    <li className="ms-6 mb-10">
                        <span className="absolute flex items-center justify-center w-5 h-5 rounded-full -start-3 ring-8 ring-black">
                            <img className="rounded-full shadow-lg" src="https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.15752-9/426266666_897400942164020_2839335090337105992_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGLimcv9_Yj2mMBnze6GUZUYr6xahBUMYNivrFqEFQxg9L3oSrEXttiPWKNrCWesICUroKorqUYYCVqlmcmzHa6&_nc_ohc=BD3welTvJNsAX9NfCl9&_nc_oc=AQl5R5evzdGcj1nLcNX8hMsdW0NW7nfk6MhP7SG6M5YVL0i-kjG806VdNQ4N_vBtnr4&_nc_ht=scontent.fmnl25-1.fna&oh=03_AdTLQSlSVu7llE405OGNGK2D3vagU2o5cVXg_TKYqRI7_w&oe=660C9984" alt="Jese Leos image"/>
                        </span>
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">04/03/2024 - 10:47am</time>
                            <div className="text-sm font-normal text-gray-500 lex ">Jese Leos has changed <a href="#" className="font-semibold text-blue-600hover:underline">Pricing page</a> task status to <span className="bg-yellow-500 text-white text-xs font-normal me-2 px-2.5 py-0.5 rounded">Edited</span></div>
                        </div>
                    </li>
                    <li className="ms-6">
                        <span className="absolute flex items-center justify-center w-5 h-5 rounded-full -start-3 ring-8 ring-black">
                            <img className="rounded-full shadow-lg" src="https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.15752-9/426266666_897400942164020_2839335090337105992_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGLimcv9_Yj2mMBnze6GUZUYr6xahBUMYNivrFqEFQxg9L3oSrEXttiPWKNrCWesICUroKorqUYYCVqlmcmzHa6&_nc_ohc=BD3welTvJNsAX9NfCl9&_nc_oc=AQl5R5evzdGcj1nLcNX8hMsdW0NW7nfk6MhP7SG6M5YVL0i-kjG806VdNQ4N_vBtnr4&_nc_ht=scontent.fmnl25-1.fna&oh=03_AdTLQSlSVu7llE405OGNGK2D3vagU2o5cVXg_TKYqRI7_w&oe=660C9984" alt="Jese Leos image"/>
                        </span>
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">04/03/2024 - 10:47am</time>
                            <div className="text-sm font-normal text-gray-500 lex ">Jese Leos has changed <a href="#" className="font-semibold text-blue-600hover:underline">Pricing page</a> task status to <span className="bg-yellow-500 text-white text-xs font-normal me-2 px-2.5 py-0.5 rounded">Edited</span></div>
                        </div>
                    </li>
                </ol>
            </div>
    </div>
    </div>
         );
};

export default logs;