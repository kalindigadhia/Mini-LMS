import { auth } from "@repo/auth/server"
import { headers } from "next/headers"
import ProgressBar from "../../../components/ProgressBar" 

async function getEnrollments(){

    const session = await auth.api.getSession({
        headers:await headers()
    })
    const userId = session?.user?.id

  if (!userId) return []

    const response = await fetch(
        `http://localhost:3212/api/my-courses?userId=${userId}`,
        {
            cache:"no-store"
        }
    )
    const enrollments = await response.json()
    
    for(let enrollment of enrollments){
        if(!enrollment.course?._id){
             continue
        }   
        const progressResponse = await fetch(`http://localhost:3212/api/course-progress?courseId=${enrollment.course._id}&userId=${userId}`,
            {
                cache:"no-store"
            }
        )
        enrollment.progress = await progressResponse.json()
    }
    return enrollments
}


export default async function MyCourses(){

    const enrollments = await getEnrollments()
   // console.log("ENROLLMENTS:", enrollments)

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                My Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {   Array.isArray(enrollments) && 
                    enrollments.map((item:any)=>(

                        <div
                            key={item._id}
                            className="border p-5 rounded-xl"
                        >

                            <h2 className="text-2xl font-bold">
                                {item.course?.title}
                            </h2>

                            <p className="mt-3">
                                {item.course?.description}
                            </p>

                            <ProgressBar 
                                percentage={
                                    item.progress?.percentage || 0
                                }
                                />
                        </div>
                    ))
                }

            </div>

        </div>
    )
}