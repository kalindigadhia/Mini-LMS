"use client"

import { useState } from "react"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import EditModal from "./EditModal"
import Link from "next/link"

export default function CourseList({initialCourses}) {

  const [courses, setCourses] = useState(initialCourses)

  const [editingCourse, setEditingCourse] = useState<any>(null)
  const updateCourse = (updated: any) => {
    if(!updated) return
    setCourses((prev: any) =>
      prev.map((c: any) =>
        c._id === updated._id ? updated : c
      )
    )
  }

  const handleDelete = (id: string) => {

    setCourses((prev: any) =>
      prev.filter((c: any) => c._id !== id)
    )
  }

  return (
    <>
      <div className="my-5 mx-5">

        <Link
          href="/courses/create"
          className="bg-blue-400 px-5 py-3 rounded-lg"
        >
          Create Course
        </Link>

      </div>

      <div className="mx-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {Array.isArray(courses) &&  //it checks the courses are actual array or not 
          courses.map((course: any) => (

            <div
              key={course._id}
              className="border my-4 p-5 rounded-xl"
            >

              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="mt-3">
                {course.description}
              </p> 

              <div className="flex gap-3 mt-5">

                <EditButton
                  course={course}
                  onEdit={setEditingCourse}  
                />  {/* Tame EditButton ne 2 things moklo cho: editingCourse = current course
                 course = {courses} means current course data
                 when edit button is clicked  inside editButton=> 
                 onClick={() => onEdit(course)} means setEditingCourse(course)  */}
                
                <Link href={`/courses/${course._id}/lessons`} 
                className="bg-green-500 px-4 py-2 rounded-lg">
                  Lessons
                </Link>
                
                <DeleteButton
                  id={course._id}
                  onSuccess={() =>
                    handleDelete(course._id)
                  }
                />

              </div>

            </div>
          ))}
      </div>

      <EditModal
        course={editingCourse}
        isOpen={!!editingCourse}
        onClose={() => setEditingCourse(null)}
        onUpdated={updateCourse}
      />
    </>
  )
}