"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

function NavbarController() {
  let pathname = usePathname()
  let noNavbar = ['/sign-in', '/sign-up'].includes(pathname)

  if (!noNavbar) {
    return <Navbar></Navbar>
  }
  return null
}

export default NavbarController