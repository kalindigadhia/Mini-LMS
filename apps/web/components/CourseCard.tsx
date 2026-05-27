import Link from "next/link"

export default function CourseCard(
    { course }: any
) {

    const thumbnail =
        course.thumbnail?.trim()
            ? course.thumbnail
            : null

    return (

        <div className="border rounded-2xl p-5 bg-white">

            {thumbnail ? (
                <img
                    className="w-full h-52 object-cover rounded-xl mb-5"
                    src={thumbnail}
                    alt={course.title}
                />
            ) : null}

            <h2 className="text-2xl font-bold">
                {course.title}
            </h2>

            <p className="mt-3">
                {course.description}
            </p>

            <Link
                href={`/course/${course._id}`}
                className="bg-cyan-100 text-cyan-700 border-current font-bold inline-block mt-5 px-4 py-2 rounded-lg"
            >
                View Course
            </Link>

        </div>
    )
}

// import Link from "next/link"

// export default function CourseCard(
//     {course}:any
// ){

//     return (

//         <div 
//             className="border rounded-2xl p-5 bg-white" >
//             <img className=" w-full h-52 object-cover rounded-xl mb-5 "
//                  src={course.thumbnail} 
//             />

//               <h2 className="text-2xl font-bold">
//                    {course.title}
//                 </h2>
//                 <p className="mt-3">
//                      {course.description}
//                 </p>
//                   <Link
//                         href={`/course/${course._id}`}
//                         className="bg-blue-400 inline-block mt-5 px-4 py-2 rounded-lg" >
//                            View Course
//                   </Link>
//         </div>
//     )
// }