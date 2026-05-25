import { connect } from "@repo/db/src"
import Course from "@repo/db/src/models/course"
import Enrollment from "@repo/db/src/models/enrollment"
import { NextResponse } from "next/server"

export async function GET(req: Request){

  try {
    await connect()
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json([], { status: 400 })
    }

    const enrollments = await Enrollment.find({ userId }).lean()
    const courseIds = enrollments.map(e => e.courseId)
    const courses = await Course.find({
     _id: { $in: courseIds },
}).lean()
       const result = enrollments.map((enrollment) => ({
      ...enrollment,
      course: courses.find(
        (c) => c._id.toString() === enrollment.courseId.toString()
      ),
    }))

    return NextResponse.json(result)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}