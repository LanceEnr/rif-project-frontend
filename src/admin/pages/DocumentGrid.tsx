import React from 'react';

interface Post {
  title: string;
  img: string;
  content: string;
  date: string;
}

const DocumentGrid: React.FC = () => {
  const posts: Post[] = [
      {
        "title": "Document Sample 1",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 1",
        "date": "2024-02-26"
      },
      { 
        "title": "Document Sample 2",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 2",
        "date": "2024-03-26"
      },
      {
        "title": "Document Sample 3",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 3",
        "date": "2024-02-26"
      },
      {
        "title": "Document Sample 4",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 4",
        "date": "2024-02-26"
      },
      {
        "title": "Document Sample 5",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 5",
        "date": "2024-02-26"
      },
      {
        "title": "Document Sample 6",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 6",
        "date": "2024-02-26"
      },
      {
        "title": "Document Sample 7",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 7",
        "date": "2024-02-26"
      },
      {
        "title": "Document Sample 8",
        "img": "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        "content": "Sample 8",
        "date": "2024-02-26"
      }
        
  ];

  return (
    <div className="grid gap-7 lg:grid-cols-5 p-10 pl-18 relative">
      {posts.map((item, index) => (
        <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={index}>
          <img
            className="object-cover w-full h-48 rounded-t-lg"
            src={item.img}
            alt="image"
          />
          <div className="p-4 rounded-b-lg">
            <h4 className="text-xl font-semibold text-yellow-500">
              {item.title}
            </h4>
            <p className="mb-2 leading-normal text-s">
              {item.content}
            </p>
            <p className="mb-2 leading-normal text-xl font-bold">
              {item.date}
            </p>
            <div className='flex justify-between'>
            <button className="px-4 py-2 text-sm text-black-100 bg-yellow-500 rounded shadow">
              Read more
            </button>
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
  );
};

export default DocumentGrid;
