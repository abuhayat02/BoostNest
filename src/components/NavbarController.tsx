"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

function NavbarController() {
  const pathname = usePathname()
  const path = pathname.startsWith('/dashboard')
  const noNavbar = pathname === '/sign-in' || pathname === 'sign-up' || path

  if (!noNavbar) {
    return <Navbar></Navbar>
  }
  return null
}

export default NavbarController