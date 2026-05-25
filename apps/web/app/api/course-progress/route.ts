import { connect } from "@repo/db/src"
import { Lesson } from "@repo/db/src/models/lesson"
import { Progress } from "@repo/db/src/models/progress"
import { NextResponse } from "next/server"

export async function GET(
    request:Request,
){

    await connect()
    const {searchParams} = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const userId = searchParams.get("userId")

    const lessons:any = await Lesson.find({
        courseId
    })

    const lessonIds = lessons.map(
        (lesson:any)=>lesson._id
    )

    const completedLessons = await Progress.find({
        userId,
        lessonId:{
            $in:lessonIds
        },
        completed:true
    })

    const percentage = lessons.length === 0 ? 0 : Math.round(
        (completedLessons.length / lessons.length ) * 100
    )

    return NextResponse.json({
        totalLessons: lessons.length,
        completedLessons: completedLessons.length,
        percentage
    })
}