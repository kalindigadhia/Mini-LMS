import {connect} from "@repo/db/src"
import { Lesson } from "@repo/db/src/models/lesson"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    await connect()

    const body = await request.json()
    console.log("BODY:", body)
    const lesson = await Lesson.create(body)
    return NextResponse.json(lesson)

  } catch (error) {
    return NextResponse.json(
      { message: "failed to create lesson" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request
) {
  await connect()

  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get("courseId")

  const lessons = await Lesson.find({ courseId :courseId })

  return NextResponse.json(lessons)
}