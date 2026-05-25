import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

export function middleware(
    request:NextRequest
){
    const session = request.cookies.get( "better-auth.session_token" )
    const isProtectedRoute = request.nextUrl.pathname.startsWith( "/my-courses" )
    if(
        isProtectedRoute && !session
    ){
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        )
    }
    return NextResponse.next()
}
export const config = {
    matcher:[
        "/my-courses/:path*"
    ]
}