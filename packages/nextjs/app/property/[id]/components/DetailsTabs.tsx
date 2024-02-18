import React, { useState } from "react";
import { CardBox } from "~~/components/custom_components/cardComponent";

export default function DetailsTabs({ TabComponents }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = tabIndex => {
    setSelectedTab(tabIndex);
  };

  return (
    <CardBox

    className='w-[100%] '
  >
    <h1 className="text-3xl font-bold">More Details</h1>
    <div role="tablist" className="tabs tabs-lifted tabs-lg w-fit">
      {TabComponents.map(({ title, Component }, index) => (
        <>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className={` tab   ${selectedTab === index ? "tab-active [--tab-bg:#352F44] text-white  " : ""}`}
            aria-label={title}
            checked={selectedTab === index}
            onChange={() => handleTabChange(index)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 ${
              selectedTab === index ? "tab-active" : ""
            } border-base-300 rounded-box p-6`}
          >
            <Component />
          </div>
        </>
      ))}
    </div>
    </CardBox>
  );
}
