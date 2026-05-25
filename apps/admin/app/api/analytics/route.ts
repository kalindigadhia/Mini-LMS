import { connect } from "@repo/db/src"
import Course from "@repo/db/src/models/course"
import Enrollment from "@repo/db/src/models/enrollment"
import { Progress } from "@repo/db/src/models/progress"

import { NextResponse } from "next/server"

export async function GET(){

    await connect()
    const totalCourses = await Course.countDocuments()
    const totalEnrollments = await Enrollment.countDocuments()
    const totalCompletedLessons = await Progress.countDocuments({
        completed:true
    })

    const totalStudents = (
    await Enrollment.distinct("userId")).length
 
    return NextResponse.json({

        totalCourses,
        totalEnrollments,
        totalCompletedLessons,
        totalStudents
    })
}