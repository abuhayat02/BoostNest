"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [profile, setProfile] = useState(false)
  const { data: session } = useSession()

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
          {
            session?.user ? <div id="profile" className="rounded-full flex flex-row-reverse gap-4 border pr-5 border-red-900 w-fit md:mb-0 mb-7 items-center justify-center">
              <p onClick={() => setProfile(!profile)} className="text-white  cursor-pointer uppercase">Profile</p>
              {session?.user?.image ? <Image width={'100'} height={100} onClick={() => setProfile(!profile)} src={session?.user?.image || '/image'} className="w-12 h-12 rounded-full cursor-pointer " alt="profile image" /> : <p onClick={() => setProfile(!profile)} className="h-12 w-12 shadow2 cursor-pointer  rounded-full text-2xl font-bold text-white text-center flex flex-row items-center justify-center">{session?.user?.name ? session?.user?.name[0] : 'U'}</p>}
              {
                profile && <div className="  ml-[270px] mx-auto w-full md:right-20 md:w-fit top-20   items-center justify-center flex flex-col  profile-section">
                  <li className="text-xl w-full text-white font-bold px-6 py-6 hover:bg-white/20 border-b "><Link href={session.user.role === 'user' ? '/dashboard' : '/dashboard/admin'}> Dashboard </Link>
                  </li>
                  <li className="text-xl w-full text-white font-bold px-6 py-6 hover:bg-white/20 border-b "><Link href={'/profile'}> Profile </Link>
                  </li>
                  <div onClick={() => setProfile(!profile)} className="absolute cursor-pointer  text-red-700 p-2 h-6 w-6 top-0 right-0 text-2xl flex flex-row items-center justify-center rounded-full bg-white/50">X</div>
                  <button className="w-fit mx-auto mt-5 flex px-6 py-2 text-white rounded-full bg-transparent shadow1 hover:border-blue-100 border-red-700 border transition-all delay-400 hover:text-white cursor-pointer" onClick={() => signOut()} >Sign Out</button>
                </div>
              }
            </div> : <p className="w-fit mx-auto mt-5 flex px-6 py-2 text-white rounded-full bg-transparent shadow1 hover:border-blue-100 border-red-700 border transition-all delay-400 hover:text-white cursor-pointer">
              <Link href={'/sign-in'} >Sign in</Link>
            </p>
          }
        </ul>
      </nav>
    </header>
  );
}
