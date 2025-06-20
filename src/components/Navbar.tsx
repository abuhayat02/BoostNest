"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  let { data: session } = useSession()

  console.log(session)

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-black shadow-white/5 z-50 sticky top-0 shadow">
      <nav className="container  mx-auto  z-50  flex items-center justify-between py-4 px-5 md:px-0 ">
        <Link href="/" className="text-3xl font-bold text-red-700">
          BOOST<span className="text-white">NEST</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        <ul
          className={`
            flex z-50 flex-col md:flex-row md:items-center gap-6 
            bg-black md:bg-transparent absolute md:static 
            w-full md:w-auto left-0 transition-all duration-300 ease-in 
            ${isOpen ? "top-full opacity-100 visible" : "top-[-490px] opacity-0 invisible"} 
            md:top-auto md:opacity-100 md:visible
          `}
        >
          <li>
            <Link
              href="/about"
              className={`block py-3 px-5 transition ${isActive("/about")
                ? "text-blue-200   "
                : "text-white hover:text-blue-400"
                }`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`block py-3 px-5 transition ${isActive("/contact")
                ? "text-blue-200 "
                : "text-white hover:text-blue-400"
                }`}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <div className="w-fit mx-auto my-6 md:my-0 md:0 md:mb-0 flex px-6 py-2 text-white rounded-full bg-transparent shadow1 hover:border-blue-100 border-red-700 border transition-all delay-400 hover:text-white cursor-pointer ">
            {session?.user ? <button onClick={() => signOut()} >Sign Out</button> : <Link href={'/sign-in'} >Sign in</Link>}
          </div>
        </ul>
      </nav>
    </header>
  );
}
