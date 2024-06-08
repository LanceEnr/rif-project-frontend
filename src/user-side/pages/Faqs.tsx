import React from "react";

const FaqSection: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4  min-h-screen my-24">
      <div className="flex flex-col items-right">
        <div className="flex flex-col items-right">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <hr className="h-px my-8 border-yellow-500 border-2" />
          <div className="container mx-auto ">
            <div className="grid pt-8 text-left md:gap-16 dark:border-gray-700 md:grid-cols-2">
              <div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How do I log in using my UST mail?
                  </h3>
                  <p className="text-gray-500">
                    To log in, click on the "Login" button on the top right
                    corner and enter your UST mail credentials. This will
                    securely authenticate you and provide access to the
                    application features based on your role.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How can I submit a risk identification form?
                  </h3>
                  <p className="text-gray-500">
                    After logging in, navigate to the "Submit Form" section.
                    Fill in the required details in the Risk Identification Form
                    and click "Submit". You can also save drafts and complete
                    them later.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Can I edit my submitted forms?
                  </h3>
                  <p className="text-gray-500">
                    Yes, you can edit your submitted forms. Go to "Submission
                    History", find the form you want to edit, and click on the
                    "Edit" button. Make the necessary changes and save them.
                  </p>
                  <p className="text-gray-500">
                    For more details, refer to our{" "}
                    <a
                      href="#"
                      className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      documentation
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    How do I view my submission history?
                  </h3>
                  <p className="text-gray-500">
                    Navigate to the "Submission History" section. Here you will
                    find a list of all your submitted forms along with their
                    statuses. You can also view details and edit your
                    submissions if needed.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    What should I do if I encounter an issue?
                  </h3>
                  <p className="text-gray-500">
                    If you encounter any issues, feel free to contact our
                    support team.
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-yellow-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Can I access the system on mobile devices?
                  </h3>
                  <p className="text-gray-500">
                    Yes, our system is fully responsive and can be accessed on
                    both desktop and mobile devices. You can submit forms, view
                    submissions, and perform all other tasks on your mobile
                    device just as you would on a desktop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
