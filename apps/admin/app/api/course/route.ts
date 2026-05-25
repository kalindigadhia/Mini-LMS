import {connect}  from "@repo/db/src"
import Course from "@repo/db/src/models/course"

import { NextResponse } from "next/server"

export async function POST(
  request: Request
) {
  try {

    await connect()
    const body = await request.json()
    const course = await Course.create(body)
    return NextResponse.json(course)

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Failed to create course",
        error
      },{
        status: 500
      })
  }
}
export async function GET(){
    // get course list 
    try{
    await connect()
    const courses = await Course.find()
    return NextResponse.json(courses) 
    }catch(error){
        console.log(error)
        return NextResponse.json(
            {message:"internal server error"},
            {status:500}
        )
    }
}