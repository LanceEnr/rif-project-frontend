import React from "react";

const Reinvent: React.FC = () => {
  return (
    <>
      <section className="bg-yellow-100 dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 ">
              A robust and efficient tool for risk management
            </h2>
            <p className="mb-4">
              By streamlining the process of risk identification and tracking,
              the system will help ensure that all potential risks are properly
              identified, assessed, and mitigated.
            </p>
            <p>
              This will ultimately contribute to the overall risk management
              strategy of the university.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg shadow-lg"
              src="https://media.discordapp.net/attachments/1216948674119205025/1231640389996253195/image.png?ex=6637b17f&is=66253c7f&hm=38d3be0ab894efdc76c6ee235f59f3d0ecdb2c706e44f16e9f74dbc410323836&=&format=webp&quality=lossless&width=523&height=619"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10 shadow-lg"
              src="https://media.discordapp.net/attachments/1216948674119205025/1231640530165829632/image.png?ex=6637b1a1&is=66253ca1&hm=cfd2d4cfdabf8a09d5cb7cf641c236afcff4bcac60b5465a1f776fb1846402ab&=&format=webp&quality=lossless&width=447&height=619"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Reinvent;
