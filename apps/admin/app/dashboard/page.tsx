

import { headers } from "next/headers"

import { redirect } from "next/navigation"
import StatsCard from "../../components/StatsCard"
import { auth } from "@repo/auth/server"

async function getAnalytics(){

    const response = await fetch( "http://localhost:3091/api/analytics",
        { cache:"no-store" }
    )
    if(!response.ok){
        return {
            totalCourses:0,
            totalStudents:0,
            totalEnrollments:0,
            totalCompletedLessons:0
        }
    }
    const data = await response.json()
    return data
}

export default async function DashboardPage(){
    const analytics = await getAnalytics()
    const session = await auth.api.getSession({
         headers:await headers()
    })
    if( session?.user.role!== "admin"){
         redirect("/")
    }
    return (
        <div className="p-10 ">

            <h1 className=" text-5xl font-bold px-38 mb-10 ">
                Admin Dashboard
            </h1>

            <div className= "grid grid-cols-4 px-38 gap-5 ">

                <StatsCard
                    title="Courses"
                    value={ analytics.totalCourses }
                />

                <StatsCard
                    title="Students"
                    value={ analytics.totalStudents}
                />

                <StatsCard
                    title="Enrollments"
                    value={analytics.totalEnrollments}
                />

                <StatsCard
                    title="Completed Lessons"
                    value={analytics.totalCompletedLessons}
                />

            </div>

        </div>
    )
}