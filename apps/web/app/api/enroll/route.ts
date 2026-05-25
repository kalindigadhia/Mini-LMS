
import { connect } from "@repo/db/src"
import { auth } from "@repo/auth/server"
import Enrollment from "@repo/db/src/models/enrollment"

import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    await connect()

    const session = await auth.api.getSession({
        headers: await headers()
    })
     if(!session){
        return NextResponse.json({
            message:"Unauthorized",},
            {status: 401}
        )
    }
    const body = await request.json()

    const courseId = body.courseId

    // check existing enrollment
    const existingEnrollment = await Enrollment.findOne({
            userId: session.user.id,
            courseId: courseId
        })
        if(existingEnrollment){
          return NextResponse.json({ message: "Already enrolled"},
           { status: 400 }
        )
      }
    
    // create enrollment
    const enrollment = await Enrollment.create({
            userId: session.user.id,
            courseId: courseId
        })

    return NextResponse.json(enrollment)
}