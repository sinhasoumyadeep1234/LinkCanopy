'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  // setup to show navbar to specific pages only
  const pathname = usePathname();
  //if path is / or /generate then only showNavbar will be true...
  const showNavbar = ["/","/generate","/handle"].includes(pathname);


  // now we show navbar accordingly based on the value of showNavbar
  return (<> {showNavbar && 
    <nav className="bg-white w-[90vw] fixed top-6 right-[5vw] rounded-full px-2 sm:px-7 flex justify-between items-center">
      {/* linktree logo */}
      <div className="logo flex gap-0 sm:gap-20 items-center">
        <Link href="/">
          <svg
            className="h-9 sm:h-20 cursor-pointer"
            viewBox="0 0 250 80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle cx="40" cy="30" r="12" fill="#4CAF50" />
            <circle cx="30" cy="38" r="10" fill="#66BB6A" />
            <circle cx="50" cy="38" r="10" fill="#66BB6A" />

            <rect x="38" y="38" width="4" height="14" fill="#795548" />

            <path
              d="M60 45c0-2 1.5-3.5 3.5-3.5h8c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5h-2"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M65 52c0 2-1.5 3.5-3.5 3.5h-8C51.5 55.5 50 54 50 52s1.5-3.5 3.5-3.5h2"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <text
              x="90"
              y="50"
              fontFamily="Segoe UI, sans-serif"
              fontSize="24"
              fill="#2E7D32"
            >
              Link
            </text>
            <text
              x="138"
              y="50"
              fontFamily="Segoe UI, sans-serif"
              fontSize="24"
              fill="#66BB6A"
              fontWeight="bold"
            >
              Canopy
            </text>
          </svg>
        </Link>

        {/* links */}
        <ul className="flex gap-0.5 text-sm sm:text-xl sm:gap-10 justify-center items-center text-[#676B5F] font-semibold">
          <Link href={'/generate'}><li>Generate</li></Link>
          <Link href={'/handle'}><li>Go to Handle</li></Link>
        </ul>
      </div>
      {/* button */}
      <div className="button flex gap-0.5 sm:gap-2">
        <button className="login px-1 py-1 sm:px-6 sm:py-5 rounded-sm bg-[#eff0ec] text-sm sm:text-lg">
          Log in
        </button>
        <button className="signup px-1 sm:p-5 bg-[#1e2330] text-white rounded-full sm:text-lg">
          Sign up free
        </button>
      </div>
    </nav>}</>
  );
};

export default Navbar;
