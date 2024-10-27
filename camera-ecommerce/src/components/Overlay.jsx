"use client";

import { Children, useContext } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { StoreContext } from "@/context/StoreContext";
import { IconShoppingCart } from "@tabler/icons-react";

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0 },
};

function List({ children, open }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate={open ? "show" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

export default function Overlay() {
  const { open } = useContext(StoreContext);
  return (
    <>
      <div className="info mt-48 ml-60 max-lg:ml-30 max-lg:mt-[50px] text-white">
        <h1>Lens</h1>
        <List open={open}>
          <h3 className="max-lg:hidden">CANON LENS</h3>
          <h4>“RF135mm f/1.8L IS USM”</h4>
          {/* <h3>
            <span className="accent">f/1.8L USM</span>
          </h3> */}

          <p className="price">$98.97</p>
          <div className="flex justify-center items-center gap-6">
            <div>
              <p>
                Image stabilisation of up to 8 stops
                <br />
                Nano-USM & up to 0.26x magnification
              </p>
            </div>
            <div>
              <IconShoppingCart size={30} />
            </div>
          </div>
        </List>
      </div>
    </>
  );
}
