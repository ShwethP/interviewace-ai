import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user }) {

            if (!user.email) return false;

            await prisma.user.upsert({
                where: {
                    email: user.email,
                },

                update: {
                    name: user.name ?? undefined,
                    image: user.image ?? undefined,
                },

                create: {
                    email: user.email,
                    name: user.name,
                    image: user.image,
                },
            });

            return true;
        },
        async session({ session }) {
            console.log("SESSION");
            console.log(session);

            return session;
        },
        async jwt({ token }) {

            console.log("JWT");

            console.log(token);

            return token;
        },
    },
});