import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/interfaces/interfaces";
import { NextAuthOptions } from "next-auth";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({

      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        try {
          await databaseConnections()
          const user = await User.findOne({ email: credentials?.email })
          if (!user) throw new Error('User not found')
          if (!credentials?.password) throw new Error("Password is required");
          if (!user?.password) throw new Error("User password not found");

          const validPassword = await bcrypt.compare(credentials.password, user.password)
          if (!validPassword) throw new Error('Password is incorrect')

          // ✅ Return a plain object with necessary fields
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }

        } catch (e) {
          return null
        }
      }

    })
  ],
  callbacks: {

    async signIn({ user, account, profile }) {

      if (account?.provider === 'google') {
        await databaseConnections()
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'user'
          });
        }

        user.role = existingUser.role;
        user.id = existingUser._id.toString();
      }


      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        const customUser = user as IUser;
        token.id = customUser.id;
        token.email = customUser.email;
        token.name = customUser.name;
        token.picture = customUser.image;
        token.role = customUser.role;
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
          role: token.role

        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
    newUser: "/",
  },

  secret: process.env.NEXTAUTH_SECRET
}