"use client";

import { LayoutGrid } from "./ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-full p-2 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Black Friday Sale
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quaerat
        aspernatur non blanditiis quasi omnis? Maiores similique est dolor
        distinctio libero, autem provident consequatur pariatur, minus
        accusantium doloribus alias ipsam!
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Pay Day Special Promo
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quaerat
        aspernatur non blanditiis quasi omnis? Maiores similique est dolor
        distinctio libero, autem provident consequatur pariatur, minus
        accusantium doloribus alias ipsam!
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Test Drive</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quaerat
        aspernatur non blanditiis quasi omnis? Maiores similique est dolor
        distinctio libero, autem provident consequatur pariatur, minus
        accusantium doloribus alias ipsam!
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Vintage Collection
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quaerat
        aspernatur non blanditiis quasi omnis? Maiores similique est dolor
        distinctio libero, autem provident consequatur pariatur, minus
        accusantium doloribus alias ipsam!
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/img/poster/blackfriday.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/img/poster/promotion.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "/img/poster/test.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "/img/poster/vintage.png",
  },
];
