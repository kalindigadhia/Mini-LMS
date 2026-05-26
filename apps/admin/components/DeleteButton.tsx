"use client"
type deleteProps={
    id:string,
    onSuccess:()=>void
}
import { useRouter } from "next/navigation"
export default function DeleteButton({id, onSuccess}:deleteProps){
    const router = useRouter()
    const handleDelete = async()=>{
        await fetch(`/api/course/${id}`,{
            method:"DELETE"
        })
        onSuccess()
        alert("course deleted")
        router.refresh()
    }
    return(
        <button onClick={handleDelete}
                className="bg-cyan-800 text-white px-4 py-2 rounded-lg">Delete</button>
    )
}