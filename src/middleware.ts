import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest) {

  if(req.nextUrl.pathname.startsWith("/dashboard")){
    const cookie = req.headers.get("cookie")
    const session = await getSession({ req: { headers: { cookie } } as any });
    console.log(session)

    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = "/api/auth/signin"
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
    if(session.user.projects === undefined || session.user.projects.length === 0){
      if(req.nextUrl.pathname !== "/dashboard/projects/create"){
        const url = req.nextUrl.clone()
        url.pathname = "/dashboard/projects/create"
        return NextResponse.redirect(url.toString(), { status: 302 })
      }
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] }