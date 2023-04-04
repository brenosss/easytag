import { type DefaultSession } from "next-auth";

export type SessionUser = {
  id: string;
} & DefaultSession["user"];
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: SessionUser;
  }
}
