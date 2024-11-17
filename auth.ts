import prisma from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log({ user, account });
      if (account?.provider === "email") {
        if (user.email) {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
              },
            });
          }
        } else {
          throw new Error("Not a user");
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});

/* 
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedCredentials = CredentialsSchema.safeParse(credentials);

          if (!validatedCredentials.success) {
            const errors = validatedCredentials.error.errors;
            throw new Error(errors[0].message || "Invalid credentials");
          }

          const { email, password } = validatedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
            },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const passwordValid = compare(
            password,
            user.password as unknown as string,
          );

          if (!passwordValid) {
            throw new Error("Invalid credentials");
          }

          // Return user data (excluding password)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error("Database error occurred");
          }
          throw new Error("Authentication failed");
        }
      },
    }),

*/
