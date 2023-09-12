import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

  if(req.nextUrl.pathname.startsWith("/dashboard")){
    const token = await getToken({ req, secret: process.env.SECRET });

    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = "/api/auth/signin"
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
    if(!token.selectedProject){
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