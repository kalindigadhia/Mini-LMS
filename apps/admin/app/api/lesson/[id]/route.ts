import { connect } from "@repo/db/src"
import { Lesson } from "@repo/db/src/models/lesson"
import { Progress } from "@repo/db/src/models/progress"
import { NextResponse } from "next/server"

export async function GET(
    request:Request,
   {params}:{params:Promise<{id:string}>}
){
     await connect()
     const {id} = await params
    const lesson = await (Lesson as any).findById(id)

    return NextResponse.json(lesson)
}
export async function DELETE(request:Request,
    {params}:{params:Promise<{id:string}>}) {
        await connect()
        const {id} =await params
        await Lesson.findByIdAndDelete(id)
        await Progress.deleteMany({
            lessonId:id
        })
        
        return NextResponse.json({message:"lesson deleted"})
}