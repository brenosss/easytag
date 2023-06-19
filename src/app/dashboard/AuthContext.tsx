import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const { status } = useSession()

  if (status === "unauthenticated") {
    redirect("/")
  }

  return <>{children}</>;
}