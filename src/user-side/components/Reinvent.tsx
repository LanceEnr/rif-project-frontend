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
              src="https://scontent.fmnl15-1.fna.fbcdn.net/v/t1.15752-9/431276410_1463064954619635_9031254072205885840_n.png?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHYFGyvkrg4dlc1sbxlHpM7X91pRXvijp1f3WlFe-KOnScyR5l0wX0V6hgtiQy1ahB3P2TFG-ed07SzChQmQPIn&_nc_ohc=diYDsg6qqb4AX9AZPgD&_nc_ht=scontent.fmnl15-1.fna&oh=03_AdQ8DjpcmZiqLd-xOvPR8Bs2tHsaefHWK3iJmW-qblcy8A&oe=6619E923"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10 shadow-lg"
              src="https://scontent.fmnl25-2.fna.fbcdn.net/v/t1.15752-9/430018500_1129575785049244_2963157075008452906_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF5FWKdJGrmxRDDAzIiRf2A7z95F3eNUqrvP3kXd41Sqh-0lVP2X27AOLzGObk5MkR-19Bf0n90axSydc0IPLPU&_nc_ohc=bho1oeX9M98AX9nssDQ&_nc_ht=scontent.fmnl25-2.fna&oh=03_AdR118XB3uRG75XbBu1PMAeBoTwJCbHdH07B0-IK95HRlw&oe=6619BA32"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Reinvent;
