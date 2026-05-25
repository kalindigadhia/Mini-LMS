"use client"


export default function EnrollButton({courseId}:{ courseId:string}){

    const handleEnroll = async()=>{
        const response = await fetch("/api/enroll",{
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    courseId
                })
            }
        )
        const data = await response.json()
           if(!response.ok){
            alert(data.error || "please login first")
            window.location.href = "/login"
            return
           }
           alert("enrolled successfully")
    }

    return (

        <button
            onClick={handleEnroll}
            className="bg-green-500 mt-5 px-5 py-3 rounded-lg" >
            Enroll Now
        </button>
    )
}