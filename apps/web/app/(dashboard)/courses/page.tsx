
import Course from "@repo/db/src/models/course"
import CourseCard from "../../../components/CourseCard"
import SearchBar from "../../../components/SearchBar"

async function getCourses(search:string =""){

    const response = await fetch(
        `http://localhost:3091/api/course?search=${search}`,{cache:"no-store"} )
        
        return response.json()
}

export default async function CoursesPage({searchParams  
    }:{
        searchParams:Promise<{search?:string}>
    }){
    const params = await searchParams
    const search = params.search || ""
    const courses = await getCourses(search)

    return (
        <div className="p-4">
            <SearchBar/>
            <h1 className="text-4xl font-bold my-4">
                Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3  gap-6">

                {Array.isArray(courses) &&
                courses.map((course: any) => (
                
                    <CourseCard 
                        key={course._id} 
                        course={course}/>     
                    ))
                }
            </div>

        </div>
    )
}