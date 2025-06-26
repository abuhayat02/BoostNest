
import NextAuth, { NextAuthOptions } from "next-auth";
import { authOption } from "@/lib/nextOuthOptions";



const handler = NextAuth(authOption)

export { handler as GET, handler as POST };
