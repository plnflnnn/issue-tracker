import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/client"
import { NextAuthConfig } from "next-auth";

const authOptions: NextAuthConfig = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],
    secret: process.env.AUTH_SECRET,
    session: {strategy: 'jwt'},
};

export default authOptions;