import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import { getCookie } from "cookies-next";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const { status } = useSession()
  const pathname = usePathname();
  const projectId = getCookie("projectId");

  if (status === "unauthenticated") {
    redirect("/")
  }
  console.log(projectId)
  if (projectId === undefined && pathname !== "/dashboard/projects/create") {
    redirect("/dashboard/projects/create")
  }

  return <>{children}</>;
}