"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const Customer = () => {
  const [emblaRef] = useEmblaCarousel();

  const review =
    "“ Online invoice payment helps companies save time, are faster and save maximum effort for the clients and save maximum effort. Online invoice payment helps companies save time ”";

  const reviewSliderData = [
    {
      id: 1,
      name: "Alexander R.",
      date: 1,
      review: review,
    },
    {
      id: 2,
      name: "Alexander R.",
      date: 1,
      review: review,
    },
    {
      id: 3,
      name: "Alexander R.",
      date: 1,
      review: review,
    },
    {
      id: 4,
      name: "Alexander R.",
      date: 1,
      review: review,
    },
  ];
  return (
    <section className="mt-[50px] md:mt-[116px]">
      <div className="container">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          <span className="text-purple">Customer</span> Say
        </h3>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviewSliderData.map((item) => (
              <div className="embla__slide" key={item.id}>
                Slide 1
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
