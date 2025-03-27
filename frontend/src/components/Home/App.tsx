import Image from "next/image";
import React from "react";
import mobileApp from "@/assets/img/home/App-Mobile.jpeg";

const App = () => {
  const appList = [
    {
      id: 1,
      text: "Premium quality food is made with ingredients that are packed with essential vitamins, minerals.",
    },
    {
      id: 2,
      text: "These foods promote overall wellness by support healthy digestion and boosting immunity",
    },
  ];
  return (
    <section>
      <div className="container flex items-center gap-[50px]">
        <div className="relative after:absolute after:top-0 after:right-0 after:bg-[url(/assets/img/home/icons/app-mob-illu.svg)]">
          <Image src={mobileApp} alt="mobile app" />
        </div>
        <div className="">
          <h2 className="">
            Premium <span>Quality</span> For Your Health
          </h2>
          <ul>
            {appList.map((item) => (
              <li
                className="relative before:absolute before:w-1.5 before:h-1.5 before:bg-gray before:rounded-full before:-left-4 before:top-2"
                key={item.id}
              >
                {item.text}
              </li>
            ))}
          </ul>
          <button name="download">Download</button>
        </div>
      </div>
    </section>
  );
};

export default App;
