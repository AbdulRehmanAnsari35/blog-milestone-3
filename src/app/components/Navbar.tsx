import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link"; 

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-52 py-4 bg-gray-100 dark:bg-gray-800">
      <Link href="/">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Silent Pages Blogs
        </h1>
      </Link>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
