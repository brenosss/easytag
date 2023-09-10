import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureAd from "next-auth/providers/azure-ad";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "src/env/server.mjs";
import { prisma } from "src/server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if(user && user.id){
        token.userId = user.id
      }
      if (account && user) {
        token.accessToken = account.access_token
        const project = await prisma.usersInProjects.findFirst({
          where: {
            userId: user.id,
            selected: true,
          },
          select: {
            project: true,
          },
        })
        if (project) {
          token.selectedProject = project.project
        }
      } 
      else if (trigger == "update") {
        const project = await prisma.usersInProjects.findFirst({
          where: {
            userId: token.userId,
            selected: true,
          },
          select: {
            project: true,
          },
        })
        if (project) {
          token.selectedProject = project.project
        }
      }
      return token
    },
    async session ({ session, token, user }) {
      session.user = user
      session.token = token
      return session
    },
    async redirect() {
      return "/dashboard/"
    }
  },
  session: { strategy: "jwt" },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    AzureAd({
      clientId: env.AZURE_CLIENT_ID,
      clientSecret: env.AZURE_CLIENT_SECRET,
      tenantId: env.AZURE_TENANT_ID,
    }),
    // ...add more providers here
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  }
};

export default NextAuth(authOptions);
