import NextAuth from "next-auth/next";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({});
