import React from 'react';

interface Post {
  title: string;
  img: string;
  content: string;
}

const DocumentGrid: React.FC = () => {
  const posts: Post[] = [
    {
      title: "React Tailwind Card with Grid 1",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "React Tailwind Card with Grid 2",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "React Tailwind Card with Grid 3",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "React Tailwind Card with Grid 4",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
  ];

  return (
    <div className="grid gap-2 lg:grid-cols-4">
      {posts.map((item, index) => (
        <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={index}>
          <img
            className="object-cover w-full h-48"
            src={item.img}
            alt="image"
          />
          <div className="p-4">
            <h4 className="text-xl font-semibold text-blue-600">
              {item.title}
            </h4>
            <p className="mb-2 leading-normal">
              {item.content}
            </p>
            <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
              Read more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid;
