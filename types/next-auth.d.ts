import type { JWT } from "next-auth/jwt"
import type { Project } from "@prisma/client"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      projects: string
    }
    token: JWT
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string
    selectedProject: Project | null
  }
}