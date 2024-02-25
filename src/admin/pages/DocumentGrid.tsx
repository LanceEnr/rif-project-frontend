import React from 'react';

interface Post {
  title: string;
  img: string;
  content: string;
}

const DocumentGrid: React.FC = () => {
  const posts: Post[] = [
    {
      title: "Document Sample 1",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "Document Sample 2",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "Document Sample 3",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
    {
      title: "Document Sample 4",
      img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
      content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
    },
  ];

  return (
    <div className="grid gap-2 lg:grid-cols-4 p-4">
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
            <p className="mb-2 leading-normal">
              {item.content}
            </p>
            <button className="px-4 py-2 text-sm text-black-100 bg-yellow-500 rounded shadow">
              Read more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid;
