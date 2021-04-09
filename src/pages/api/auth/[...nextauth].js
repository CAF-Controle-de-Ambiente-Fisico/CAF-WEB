import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { api } from "../../../../service/api";

export default NextAuth({
  site: process.env.NEXT_PUBLIC_API_URL,
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({ ...session, user });
    },
    jwt: async (token, user) => {
      return Promise.resolve(user || token);
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  providers: [
    Providers.Credentials({
      id: "domain-signin",
      name: "Domain Signin",
      authorize: async (credentials) => {
        console.log(" SignIn = ", credentials);
        return api
          .post(
            "v1/auth",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            const access = response.data.access;
            if (user === null || token === null) {
              console.log("User = ", user);
              console.log("Token = ", token);
              return Promise.reject(new Error("invalid_credentials"));
            } else {
              return Promise.resolve({ ...user, token, ...access });
            }
          })
          .catch((error) => {
            console.log("error = ", error);
            return Promise.reject(new Error("invalid_credentials"));
          });
      },
      credentials: {
        email: { label: "Email", type: "text ", placeholder: "Email" },
        password: { label: "Senha", type: "password" },
      },
    }),
  ],
});
