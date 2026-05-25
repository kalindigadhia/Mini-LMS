import {connect} from "@repo/db/src"
import  Course from "@repo/db/src/models/course"
import Enrollment from "@repo/db/src/models/enrollment"
import { Lesson } from "@repo/db/src/models/lesson"
import { Progress } from "@repo/db/src/models/progress"
import { NextResponse } from "next/server"

export async function GET(request:Request,
    {params}:{params:Promise<{id:string}>}
){ 
    try{
    await connect()
    const {id} = await params
    const course = await (Course as any).findById(id) // finds the course on given ID
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(course)
    } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function PATCH( // to update the request
    request:Request, 
    {params}:{params:Promise<{id:string}>}
){
    await connect()
    const {id} = await params
    const body = await request.json() // reads the updated data that comes from frontend body
    const course = await (Course as any).findByIdAndUpdate( // this will update in the db
        id,
        body,
        {new: true}
    )
    return NextResponse.json(course);
}
export async function DELETE(
    request:Request,
    {params}:{ 
        params:Promise<{id:string }>
    }
) {
    await connect()
    const {id} =await params

    // const lessons = await Lesson.find({id})

    // const lessonIds = lessons.map((lesson:any)=>
    //     lesson._id
    // )

    // await Progress.deleteMany({lessonId:{
    //         $in:lessonIds
    //     }
    // })

    // await Lesson.deleteMany({id})

    // await Enrollment.deleteMany({id})

    await (Course as any).findByIdAndDelete(id)
    
    return NextResponse.json({
        message:"course deleted"
    })
}
