import { connect } from "@repo/db/src"
import { Progress } from "@repo/db/src/models/progress"
import { auth } from "@repo/auth/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
  await connect()
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const body = await request.json()
    console.log(body)
    const progress = await Progress.create({
      userId: session.user.id,
      lessonId: body.lessonId, // ✅ MUST MATCH SCHEMA
      completed: true,
    })
    return NextResponse.json(progress)
    
  } catch (error: any) {
    console.error("PROGRESS API ERROR:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}