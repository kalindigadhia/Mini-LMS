"use client"

import Link from "next/link"
import {useEffect, useState } from "react"
import VideoUpload from "../../../../components/VideoUpload"

export default function LessonsPage(
    {params}:{params:Promise<{id:string}>}
){
    
    const [title,setTitle] = useState("")
    const [videoUrl,setVideoUrl] = useState("")
    const [lessons , setLessons] = useState<any[]>([])

    async function getLessons(){
        const id = (await params).id
        const response = await fetch(`/api/lesson?courseId=${id}` )
        const data = await response.json()
        setLessons(data)
    }
    useEffect(()=>{

        getLessons()

    },[])

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        const response = await fetch( "/api/lesson",{
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    title,
                    //videoUrl,
                    courseId:(await params).id
                })
            })
        const data = await response.json()
        console.log(data)
        alert("Lesson Added")
        setTitle("")
       setVideoUrl("")
    }
   
    return (
        <div className="p-10">

            <form onSubmit={handleSubmit}
                  className="flex flex-col gap-5 max-w-xl" >

                <h1 className="text-4xl font-bold">
                    Add Lesson
                </h1>

                <input
                    type="text"
                    placeholder="Lesson Title"
                    value={title}
                    onChange={(e)=>
                        setTitle(e.target.value)
                    }
                    className="border p-3 rounded-lg"
                />
                 <input
                    type="text"
                    placeholder="Video URL"
                    value={videoUrl}
                    onChange={(e)=>
                        setVideoUrl(e.target.value)
                    }
                    className="border p-3 rounded-lg"
                /> 
                <div className="flex">
                 <VideoUpload onChange={(url:string)=>setVideoUrl}/>
                </div>
                <button
                    type="submit"
                    className="bg-cyan-700 text-white text-xl font-bold p-3 rounded-lg"
                >
                    Add Lesson
                </button>
            </form>
             <div className="mt-10">

                <h2 className="text-3xl font-bold mb-5">
                    Lessons
                </h2>

                <div className="flex row-span-2 gap-5">

                    {   Array.isArray(lessons) && 
                        lessons.map((lesson:any)=>(

                            <div
                                key={lesson._id}
                                className="border p-5 rounded-xl"
                            >
                                
                                <h3 className="text-2xl font-bold">
                                    {lesson.title}
                                </h3>

                                 <Link href={lesson.videoUrl} target="_blank" className=" flex gap-2 mt-2 text-sm break-all">
                                    {lesson.videoUrl}
                                </Link> 
                                <button className="bg-cyan-700 text-white px-3 py-2 rounded-lg mt-3"
                                 onClick={async()=>{ 
                                    await fetch(`/api/lesson/${lesson._id}`,{
                                         method:"DELETE"
                                        })
                                        location.reload()
                                     }}>
                                 Delete Lesson</button>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
} 
