"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

import Image from "next/image";
import MovingBorderButton from "./MovingBorderButton";

export default function BackgroundGradientDemo() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <ul className="md:w-full grid grid-cols-4 gap-2 p-2 max-lg:grid-cols-1">
        {items.map((item, idx) => (
          <li key={idx} className="">
            <BackgroundGradient className="rounded-[22px] w-[320px] h-[340px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <Image
                src={item.img}
                alt="jordans"
                height="300"
                width="300"
                className="object-contain"
              />
              <p className="text-base sm:text-xl text-black mt-2 mb-2 dark:text-neutral-200">
                {item.name}
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
              <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <span>Buy now </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  ${item.price}
                </span>
              </button>
            </BackgroundGradient>
          </li>
        ))}
      </ul>
      <div className="mb-10">
        <MovingBorderButton>Load More</MovingBorderButton>
      </div>
    </div>
  );
}

const items = [
  {
    img: "/img/access/bag-1.jpg",
    name: "Camera Bag 1",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },

  {
    img: "/img/access/bag-2.jpg",
    name: "Camera Bag 2",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/img/access/bag-8.jpg",
    name: "Camera Bag 3",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/img/access/bag-9.jpg",
    name: "Camera Bag 4",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },

  {
    img: "/img/access/triport-4.jpg",
    name: "Camera Stand 1",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/img/access/triport-5.jpg",
    name: "Camera Stand 2",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/img/access/triport-8.jpg",
    name: "Camera Stand 3",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/img/access/triport-9.jpg",
    name: "Camera Stand 4",
    price: 275.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
