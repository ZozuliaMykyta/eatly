"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Questions = () => {
  const [openedList, setOpenedList] = useState<{ [key: number]: boolean }>({});

  const questionsData = [
    {
      id: 1,
      question: "How long does delivery take?",
      answer:
        "You Can Get Information By Contacting Our Support Team Have 24/7 Service.What’s The Difference Between Free And Paid Plan ?",
    },
    {
      id: 2,
      question: "How Does It Work?",
      answer:
        "Our platform connects you with local restaurants and couriers. Simply browse the menu, place your order, and track your delivery in real time through our app or website.",
    },
    {
      id: 3,
      question: "How does your food delivery service work?",
      answer:
        "Once you place an order, we immediately notify the restaurant. A delivery partner picks up your food and delivers it to your doorstep, usually within the estimated delivery time shown during checkout.",
    },
    {
      id: 4,
      question: "What payment options do you accept?",
      answer:
        "We accept all major credit and debit cards, mobile payment apps like Apple Pay and Google Pay, and some locations also accept cash on delivery.",
    },
    {
      id: 5,
      question: "Do you offer discounts or promotions?",
      answer:
        "Yes! We regularly provide discount codes, seasonal promotions, and exclusive offers for our app users. Be sure to check the promotions tab or subscribe to our newsletter to stay updated.",
    },
  ];

  const toggleList = (id: number) => {
    setOpenedList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="container !mt-[120px] text-center">
      <h2 className="relative inline-block text-[32px] leading-[120%] capitalize text-center">
        frequently asked
        <br />
        <span className="text-purple"> questions</span>
        <Image
          src="/assets/img/questions-lines.svg"
          alt="decoration"
          width={41}
          height={39}
          className="absolute top-[-40px] right-[-50px]"
        ></Image>
      </h2>
      <div className="mt-[80px] text-left">
        {questionsData.map((data) => (
          <div
            key={data.id}
            className="relative custom-border-b !pb-[40px] mb-[30px] last:mb-0"
          >
            <h3
              className="cursor-pointer text-[23px] leading-[60px] text-[rgb(50,49,66)]"
              onClick={() => toggleList(data.id)}
            >
              {data.question}
            </h3>
            <p
              className={`
                overflow-hidden transition-all duration-300 ease-in-out text-[20px] leading-[160%] font-normal text-[rgb(104,104,104)]
                ${
                  openedList[data.id]
                    ? "max-h-96 opacity-100 scale-100 pointer-events-auto mt-5"
                    : "max-h-0 opacity-0 scale-95 pointer-events-none mt-0"
                }
              `}
            >
              {data.answer}
            </p>
            <div className="absolute top-[16px] right-[13px]">
              <div className="relative w-[30px] h-[30px] bg-purple rounded-full">
                <div className="absolute top-[50%] left-[50%] translate-[-50%]">
                  {openedList[data.id] ? (
                    <FaMinus className="text-[12px]" color="white" />
                  ) : (
                    <FaPlus className="text-[12px]" color="white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
