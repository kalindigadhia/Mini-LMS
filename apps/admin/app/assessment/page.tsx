"use client"

import { useState } from "react"

export default function AssessmentPage(){

    const [lessonId,setLessonId]= useState("")
    const [question, setQuestion] = useState("")
    const [option1, setOption1]= useState("")
    const [option2, setOption2]= useState("")
    const [option3,setOption3] = useState("")
    const [option4,setOption4] = useState("")
    const [correctAnswer, setCorrectAnswer]= useState("")

    async function handleSubmit(){

        await fetch( "/api/assessment", { //first this fetch hits the API 
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    lessonId,
                    question,
                    options:[
                        option1,
                        option2,
                        option3,
                        option4
                    ],
                    correctAnswer
                })
            }
        )
        alert("Assessment created")
    }

    return (

        <div className="flex justify-center items-center flex-col p-10 ">

            <h1 className=" text-4xl font-bold mb-5"> Create Assessment </h1>
            <div className=" flex flex-col w-2xl gap-5" >
                <input placeholder="Lesson ID"
                    onChange={(e)=> setLessonId(e.target.value )}
                    className=" border p-3 rounded-lg"
                    />

                <input placeholder="Question"
                    onChange={(e)=> setQuestion(e.target.value)}
                    className=" border p-3 rounded-lg"
                />

                <input placeholder="Option 1"
                    onChange={(e)=> setOption1(e.target.value )}
                    className="border p-3 rounded-lg"
                />

                <input placeholder="Option 2"
                    onChange={(e)=> setOption2( e.target.value)}
                    className="border p-3 rounded-lg"   
                />

                <input placeholder="Option 3"
                    onChange={(e)=>setOption3( e.target.value )}
                     className="border p-3 rounded-lg" 
                />
                <input placeholder="Option 4"
                    onChange={(e)=>setOption4( e.target.value )}
                     className="border p-3 rounded-lg" 
                />

                <input placeholder= "Correct Answer"
                    onChange={(e)=>setCorrectAnswer(e.target.value)}
                    className="border p-3 rounded-lg" 
                />

                <button onClick={ handleSubmit }
                    className=" bg-cyan-800 text-white font-bold text-xl p-3 rounded-lg "
                >
                    Create Assessment
                </button>
            </div>
        </div>
    )
}