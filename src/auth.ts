import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";
import { NextResponse } from "next/server";
// 카카오 사용
// import kakaoProvider from "next-auth/providers/kakao";

// npm i msw@2.1
// 2.2는 한글과 관련된 버그가 있음. 현재는 2.4.9

// callbacks: {
//   async authorized({ request, auth }) {
//     if (!auth) {
//       return NextResponse.redirect("http://localhost:3000/i/flow/login");
//     }
//     return true;
//   },
// },
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  events: {
    signOut(data) {
      console.log(
        "auth.ts events signout",
        "session" in data && data.session,
        "token" in data && data.token
      );
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    session(data) {
      console.log(
        "auth.ts events session",
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.userName,
              password: credentials.password,
            }),
          }
        );
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          console.log(parsed);
          parsed &&
            parsed["connect.sid"] &&
            cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) {
          const credentialsSignin = new CredentialsSignin();
          if (authResponse.status === 404) {
            credentialsSignin.code = "no_user";
          } else if (authResponse.status === 401) {
            credentialsSignin.code = "wrong_password";
          }
          throw credentialsSignin;
        }

        const user = await authResponse.json();
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
    // kakaoProvider
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
});
