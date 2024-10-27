"use client";
import React from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme("dark");
  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default DarkModeToggle;
