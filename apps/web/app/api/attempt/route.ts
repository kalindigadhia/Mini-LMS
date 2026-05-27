import { auth } from "@repo/auth/server"
import { connect } from "@repo/db/src"

import { Assessment } from "@repo/db/src/models/assessment"
import { Attempt } from "@repo/db/src/models/attempt"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request:Request){

    await connect()
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session){
        return NextResponse.json(
            {message:"unauthorized"},{status:401})
    }

    const body = await request.json()
    const assessment = await Assessment.findById(body.assessmentId)
    if (!assessment) {
    return NextResponse.json(
      { message: "Assessment not found" },
      { status: 404 }
    )
  }
    const passed = assessment.correctAnswer === body.selectedAnswer

    await Attempt.create({

        userId: session.user.id,
        assessmentId: body.assessmentId,
        selectedAnswer: body.selectedAnswer,
        passed

    })
    return NextResponse.json({
        passed,
        message: passed ? "Passed ✅" : "Failed ❌"
    })
}