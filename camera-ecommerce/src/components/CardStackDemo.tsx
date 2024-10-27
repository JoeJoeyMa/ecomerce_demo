"use client";
import AnimatedTooltipPreview from "./AnimatedTooltipPreview";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";

export default function CardStackDemo() {
  return (
    <>
      <div className="mt-10">
        <AnimatedTooltipPreview />
      </div>
      <div className="h-[20rem] flex items-center justify-center w-full max-lg:w-[500px]">
        <CardStack items={CARDS} />
      </div>
    </>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "John Doe",
    designation: "Software Engineer",
    content: (
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni earum,
        mollitia veritatis voluptas minus voluptates odio quam. Et enim quos
        autem quasi, minima tempora delectus aut veritatis, eaque corporis
        ullam!
      </p>
    ),
  },
  {
    id: 1,
    name: "Robert Johnson",
    designation: "Product Manager",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        excepturi tempore in, illo tenetur ducimus quam aut! Ipsum molestiae,
        numquam dolor architecto esse dolorum porro ullam rem eligendi, et
        delectus.
      </p>
    ),
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Data Scientist",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        magni consequatur quam distinctio, repellendus laborum ipsam itaque unde
        doloremque expedita, soluta vel reiciendis esse minima voluptates sed
        veniam. Nisi, repellendus!
      </p>
    ),
  },
  {
    id: 3,
    name: "Emily Davis",
    designation: "UX Designer",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        magni consequatur quam distinctio, repellendus laborum ipsam itaque unde
        doloremque expedita, soluta vel reiciendis esse minima voluptates sed
        veniam. Nisi, repellendus!
      </p>
    ),
  },
  {
    id: 4,
    name: "Tyler Durden",
    designation: "Soap Developer",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        magni consequatur quam distinctio, repellendus laborum ipsam itaque unde
        doloremque expedita, soluta vel reiciendis esse minima voluptates sed
        veniam. Nisi, repellendus!
      </p>
    ),
  },
  {
    id: 5,
    name: "Dora",
    designation: "The Explorer",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        magni consequatur quam distinctio, repellendus laborum ipsam itaque unde
        doloremque expedita, soluta vel reiciendis esse minima voluptates sed
        veniam. Nisi, repellendus!
      </p>
    ),
  },
];
