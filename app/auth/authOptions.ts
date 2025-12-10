import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            name: {label: 'Name', type: 'string', placeholder: 'Your name'},
            email: {label: 'Email', type: 'email', placeholder: 'Email'},
            password: {label: 'Password', type: 'password', placeholder: 'Password'},
        },
        async authorize(credentials) {
          if (!credentials?.name || !credentials?.email || !credentials?.password) return null;
          const name = String(credentials.name);
          const email = String(credentials.email);
          const password = String(credentials.password);
          let user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            const hashed = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
              data: { email, hashedPassword: hashed, name }
            });
            return { id: String(user.id), email: user.email, name: user.name };
          }
          const hash = user.hashedPassword;
          if (!hash) return null;
          const ok = await bcrypt.compare(password, hash);
          return ok ? { id: String(user.id), email: user.email, name: user.name ?? null } : null;
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
};

export default authOptions;
