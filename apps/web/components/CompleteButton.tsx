"use client"

export function CompleteButton(
    {lessonId}:{
        lessonId:string
    }
){

    const handleComplete = async()=>{ 
        const response = await fetch("http://localhost:3212/api/progress", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    lessonId
                })
            }
        )
        const data =await response.json()
        alert("Lesson Completed")
    }

    return (

        <button
            onClick={handleComplete}
            className="bg-blue-500 px-5 py-3 rounded-lg mt-5"
        >
            Mark Complete
        </button>
    )
}