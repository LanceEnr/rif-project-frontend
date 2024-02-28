import React from 'react';

interface Post {
  title: string;
  img: string;
  content: string;
  date: string;
}

const SubmissionHistory: React.FC = () => {
  const posts: Post[] = [
    {
      "title": "Document Sample 1",
      "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
      "content": "Sample 1",
      "date": "2024-02-26"
    },
    { 
      "title": "Document Sample 2",
      "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
      "content": "Sample 2",
      "date": "2024-03-26"
    },
    { 
        "title": "Document Sample 3",
        "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
        "content": "Sample 3",
        "date": "2024-03-26"
      },
      { 
        "title": "Document Sample 4",
        "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
        "content": "Sample 4",
        "date": "2024-03-26"
      },
      { 
        "title": "Document Sample 5",
        "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
        "content": "Sample 5",
        "date": "2024-03-26"
      },
      { 
        "title": "Document Sample 6",
        "img": "https://www.pdffiller.com/preview/332/872/332872673.png",
        "content": "Sample 6",
        "date": "2024-03-26"
      },
      {
        "title": "Blank Document Upload",
        "img": "data:image/png;base64,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",
        "content": "Click to upload your Document",
        "date": ""
      },    
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Submission History</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
          View the submission history and track progress.
          </p>
          <form action="#" method="GET" className="hidden lg:block lg:pl-2">
            <label className="sr-only">Search</label>
            <div className="relative mt-1 lg:w-72">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />{" "}
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 "
                placeholder="Search"
              />
            </div>
          </form>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="grid gap-7 lg:grid-cols-5 p-1 pl-18 relative">
        {posts.map((item, index) => (
          <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={index} style={{ cursor: 'pointer' }}>
            <img
              className="object-cover w-full h-64 rounded-t-lg"
              src={item.img}
              alt="image"
              style={{ transition: 'transform .0.5s' }}
              onMouseOver={(e) => {
                (e.target as HTMLImageElement).style.transform = 'scale(1.03)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLImageElement).style.transform = 'scale(1)';
              }}
            />
            <div className="p-4 rounded-b-lg">
              <h4 className="text-l font-semibold">
                {item.title}
              </h4>
              <p className="mb-2 leading-normal text-xs">
                {item.content}
              </p>
              <div className='flex justify-between'>
                <div className="flex">
                  <svg className="h-6 w-6  text-gray-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
                  </svg>
                  <svg className="h-6 w-6 text-gray-800 mx-1"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <p className="mb-2 leading-normal text-xs font-normal" style={{ color: '#2d3748' }}>
                    {item.date}
                  </p>
                </div>
                <div className="svg-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertica" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmissionHistory;
