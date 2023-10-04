import Google from "next-auth/providers/google";

export const options = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { account, profile } = params;
      if (account.provider === "google") {
        return profile.email_verified && profile.email?.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};
