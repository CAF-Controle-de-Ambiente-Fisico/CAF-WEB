import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { api } from "../../../service/api";

export default NextAuth({
  site: process.env.NEXT_PUBLIC_API_URL,
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({ ...session, user });
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(user || token);
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      id: "domain-signin",
      name: "Domain Signin",
      authorize: async (credentials) => {
        console.log(" SignIn = ", credentials);
        return api
          .post("v1/auth", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            if (user === null || token === null) {
              return Promise.reject(new Error("invalid_credentials"));
            } else {
              return Promise.resolve({ ...user, access_token: token });
            }
          })
          .catch(() => {
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
