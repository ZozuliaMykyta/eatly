import React from "react";

const About = () => {
  const aboutData = [
    {
      id: 1,
      info: "10K+",
      desc: "Satisfied Costumers\n All Great Over The World",
    },
    {
      id: 2,
      info: "4M",
      desc: "Healthy Dishes Sold\n Including Milk Shakes Smooth",
    },
    {
      id: 3,
      info: "99.99%",
      desc: "Reliable Customer Support\n We Provide Great Experiences",
    },
  ];
  return (
    <section className="about-section">
      <div className="container max-w-[970px]! max-[900px]:py-[80px]! min-[900px]:py-[55px]!">
        <div className="flex-col min-[900px]:flex-row min-[900px]:flex items-center justify-between text-center">
          {aboutData.map((el) => (
            <div
              className="max-[900px]:border-b min-[900px]:border-r border-[rgb(197,197,197)]/15 max-[900px]:mt-[60px] max-[900px]:first:mt-0 max-[900px]:pb-[60px] max-[900px]:last:pb-0 min-[900px]:pr-[66px] min-[900px]:last:pr-0 last:border-none"
              key={el.id}
            >
              <h3 className="text-[43px] font-bold leading-[54px] text-white">
                {el.info}
              </h3>
              <pre className="text-[rgb(197,191,237)] text-[14px] leading-[22px] mt-2.5">
                {el.desc}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
