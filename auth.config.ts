import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
    trustHost: true,

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

} satisfies NextAuthConfig;

export default authConfig;
