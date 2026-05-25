import { auth } from "@repo/auth/server"
import { CompleteButton } from "../../../../../../components/CompleteButton" 
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { connect } from "@repo/db/src"
import Enrollment from "@repo/db/src/models/enrollment"
import mongoose from "mongoose"

async function getLesson(lessonId:string) {

    const response = await fetch(
        `http://localhost:3091/api/lesson/${lessonId}`,{ cache:"no-store"}
    )
    return response.json()
}


export default async function LessonPage(
   // {params}:any
    {params}:{
        params:Promise<{
            id:string
            lessonId:string}>
    }
){
     const {lessonId} = await params

    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session){
        redirect("/login")
    }
    const lesson = await getLesson(lessonId)
    if(!lesson){
        return <div>  Lesson not found</div>
    }
    const courseId =
        typeof lesson.courseId === "object"
            ? lesson.courseId._id
             : lesson.courseId
    await connect()

    const enrollment = await Enrollment.findOne({
        courseId: new mongoose.Types.ObjectId(courseId),
        userId: session.user.id
    })

    console.log("FOUND ENROLLMENT:", enrollment)

    if(!enrollment){
        redirect("/courses")
        
    }


function convertToEmbedUrl(url:string){
    const videoId = url.split("v=")[1]?.split("&")[0] ||
                    url.split("youtu.be/")[1]?.split("?")[0] // split("youtu.be/")[1]? = ["https://youtu.be/","xTS5Pt6PqoQ?si=abc"] , .split("?")[0] = video ID (xTS5Pt6PqoQ)
        
            return `https://www.youtube.com/embed/${videoId}`
}

const embedUrl = convertToEmbedUrl(
    lesson.videoUrl
)

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                {lesson.title}
            </h1>

            <iframe
                width="500"
                height="300"
                src={embedUrl}
                title="video"
                allowFullScreen
                className="rounded-xl"
            />
            <CompleteButton lessonId={lesson._id}/>

        </div>
    )
}