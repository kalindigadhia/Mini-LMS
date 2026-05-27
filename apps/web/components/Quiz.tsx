"use client"

import { useState } from "react"

export default function Quiz(
    {assessment}:any){

        const [selected,setSelected] = useState("")
        const [result,setResult] = useState("")
        const [loading, setLoading] = useState(false)

        async function handleSubmit() {
            setLoading(true)

            const response =await fetch("/api/attempt",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    assessmentId: assessment._id,
                    selectedAnswer: selected
                })
            })
            if(!response.ok){
                console.log("api failed")
                return
            }
            const data = await response.json()
            setResult(data.message)
            setLoading(false)
        }
        return(
            <div className="border p-5 w-2xl rounded-2xl mt-10">
                <h1 className="text-3xl text-cyan-800 font-bold mb-5 ">QUIZ</h1>
                <p className="mb-3 font-bold text-2xl">{assessment.question}</p>

                <div className="flex flex-col gap-2">
                    {assessment?.options?.map((option:string)=>(
                        <button key={option} 
                                onClick={()=>{setSelected(option)}}
                                className={`border p-2 rounded-lg text-left text-lg
                                    ${selected === option ? "bg-cyan-100 text-cyan-800" : ""}`}>
                            {option}
                                </button>
                    )
                    )}
                    </div>
                    <div className="flex  gap-3">
                    <button onClick={handleSubmit}
                            className="bg-cyan-800 text-cyan-50 font-bold p-3 rounded-lg mt-5" >
                             {loading ? "Submitting..." : "Submit Answer" }
                      </button>
                      { result && (
                         <p className="mt-5 text-xl p-3 font-bold" >
                        {result}
                    
                    </p>
                ) }
                </div>
            </div>
        )
}

