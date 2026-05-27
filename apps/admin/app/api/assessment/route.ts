import { connect } from "@repo/db/src"
import { Assessment } from "@repo/db/src/models/assessment"
import { NextResponse } from "next/server"

export async function POST(
    request:Request
){
    await connect()
    const body = await request.json() //frontend page fetch("api/assessment"), next.js API route hits 
    //data comes from the request object , and then through the request.json() we get body 
    const assessment = await Assessment.create(body)
    return NextResponse.json(assessment)
}