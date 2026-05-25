
import CourseCard from "../../../components/CourseCard"

async function getCourses(){

    const response = await fetch(
        "http://localhost:3091/api/course",{cache:"no-store"} )
        
        return response.json()
}

export default async function CoursesPage(){

    const courses = await getCourses()

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold my-5">
                Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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