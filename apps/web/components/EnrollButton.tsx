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
           if(response.status === 401){
            alert(data.error || "please login first")
            window.location.href = "/login"
            return
           }
           else if(response.status === 400){
            alert("already enrolled")
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