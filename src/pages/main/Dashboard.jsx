import React from 'react';
import property from '../../assets/icons/property.png';
import userIcon from '../../assets/icons/user.png';
import agentIcon from '../../assets/icons/agent.png';
import UserGrowthChart from '../../components/charts/UserGrowthChart';
import ActivityChart from '../../components/charts/ActivityChart';

function Dashboard() {

  const cardData = [
    {
      title: 'Total User',
      value: 1576,
      icon: <img src={userIcon} alt="asd" />,
    },
    {
      title: 'Total Agent ',
      value: 76,
      icon: <img src={agentIcon} alt="wer" />,
    },
    {
      title: 'Total Property ',
      value: 30,
      icon: <img src={property} alt="" />,
    },
  ];

  return (
     <div>
      {/* <PageHeading title="Dashboard" /> */}
      <div className="flex items-center  justify-between bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-pink-high)]/70 p-12 rounded-xl">
        {cardData.map((card, index) => (
          <div className="" key={index}>
            <div
              className={`flex ${
                index !== 2 ? 'border-r-2' : ''
              } px-12 items-center justify-center gap-3`}
            >
              <div className="w-28 h-28 flex items-center justify-center">
                {card.icon}
              </div>
              <div className="flex items-start flex-col justify-center ">
                <h1 className="text-3xl !font-semibold leadingflex items-center justify-center -4">
                  {card.title}
                </h1>
                <h1 className="text-3xl !font-semibold  text-[var(--bg-pink-high)]">
                  {card.value}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4  gap-4 mt-4 xl:h-[450px]">
        <div className="w-full col-span-4 xl:col-span-3 h-full">
          <UserGrowthChart />
        </div>
        <div className="xl:col-span-1 col-span-4 shadow-lg">
            <ActivityChart />
        </div>
      </div>
      {/* <div className="mt-4">
        <RecentlyJoinedUsers />
      </div> */}
    </div>
  );
}

export default Dashboard;