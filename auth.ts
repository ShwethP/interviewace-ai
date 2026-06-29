import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            await prisma.user.upsert({
                where: { email: user.email },
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
    },
});