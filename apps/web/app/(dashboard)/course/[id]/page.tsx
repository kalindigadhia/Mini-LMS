import Link from "next/link"
import EnrollButton from "../../../../components/EnrollButton" 
async function getCourse(id:string){

    const response = await fetch(
        `http://localhost:3091/api/course/${id}`,{ cache:"no-store"}
    )
    return response.json()
}

async function getLessons(id:string){

    const response = await fetch(
        `http://localhost:3091/api/lesson?courseId=${id}`,{ cache:"no-store"}
    )
    return response.json()
}

export default async function CoursePage(
    context :{params:Promise<{id:string}>}
){
const id = (await context.params).id
    const course = await getCourse(id)

    const lessons = await getLessons(id)

    return (

        <div className="p-10">

            <h1 className="text-5xl font-bold">
                {course.title}
            </h1>

            <p className="mt-5 text-lg">
                {course.description}
            </p>
            <EnrollButton courseId={course._id} />
            
       <div className="mt-10">

                <h2 className="text-3xl font-bold mb-5">
                    Lessons
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-5">

                    {   Array.isArray(lessons) &&
                        lessons?.map((lesson:any)=>(

                            <Link
                                key={lesson._id}

                                href={`/course/${course._id}/lesson/${lesson._id}`}

                                className="border p-5 rounded-xl"
                            >

                                <h3 className="text-2xl font-bold">
                                    {lesson.title}
                                </h3>

                            </Link>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}