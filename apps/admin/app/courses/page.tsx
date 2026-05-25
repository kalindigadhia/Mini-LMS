import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@repo/auth/server"
import CourseList from "../../components/CourseList"

async function getCourses() {
    const response = await fetch("http://localhost:3091/api/course",{ cache:"no-store"})
    return response.json()
}
export default async function CoursesPage() {
    
    const courses = await getCourses()
    const session = await auth.api.getSession({
             headers:await headers()
        })
        if( session?.user.role!== "admin"){
             redirect("/")
        }
    return(
        <div className="p-1">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                    Courses
                </h1>
            </div>
            <CourseList initialCourses={courses}/>
        </div>
    )
}