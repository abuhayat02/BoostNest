import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

let handler = NextAuth({
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
          if (!user) {
            throw new Error('user not found')
          }
          if (!credentials?.password) {
            throw new Error("Password is required");
          }

          if (!user?.password) {
            throw new Error("User password not found");
          }
          const validPassword = await bcrypt.compare(credentials?.password, user?.password)

          if (!validPassword) {
            throw new Error('password is not match')
          }
          return user
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
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || 'user'
          });
        }

      }

      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        const customUser = user as any;
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
})

export { handler as GET, handler as POST };
