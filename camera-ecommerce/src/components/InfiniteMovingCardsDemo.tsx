"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-full w-full rounded-md antialiased bg-gray-300 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    img: "/img/camera/camera-product-1.jpg",
    name: "Camera 1",
    price: 275.99,
  },

  {
    img: "/img/camera/camera-product-3.jpg",
    name: "Camera 2",
    price: 275.99,
  },
  {
    img: "/img/camera/camera-product-4.jpg",
    name: "Camera 3",
    price: 275.99,
  },
  {
    img: "/img/camera/camera-product-5.jpg",
    name: "Camera 4",
    price: 275.99,
  },
  {
    img: "/img/camera/camera-product-6.jpg",
    name: "Camera 5",
    price: 275.99,
  },
  {
    img: "/img/camera/camera-product-7.jpg",
    name: "Camera 6",
    price: 275.99,
  },
  {
    img: "/img/camera/camera-product-8.jpg",
    name: "Camera 7",
    price: 275.99,
  },
  {
    img: "/img/camera/lens-product-8.jpg",
    name: "Lens 1",
    price: 275.99,
  },
  {
    img: "/img/camera/lens-product-1.jpg",
    name: "Lens 2",
    price: 275.99,
  },
  {
    img: "/img/camera/lens-product-5.jpg",
    name: "Lens 3",
    price: 275.99,
  },
];
