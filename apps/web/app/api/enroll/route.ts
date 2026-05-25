import {connect} from "@repo/db/src"
import { auth } from "@repo/auth/server"
import Enrollment from "@repo/db/src/models/enrollment"

import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request:Request){

    await connect()
    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        return NextResponse.json({
            message:"Unauthorized",},
            {status: 401}
        )
    }
    const body = await request.json()

    const enrollment = await Enrollment.create({
        userId: session.user.id,
        courseId: body.courseId
    })

    return NextResponse.json(
        enrollment
    )
}