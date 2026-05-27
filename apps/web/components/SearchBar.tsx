"use client"

import {useRouter , useSearchParams} from "next/navigation"
import { useEffect, useState } from "react"
    export default function SearchBar(){
        const router = useRouter()
        const searchParams = useSearchParams()

        const [search, setSearch] = useState("")
        const [suggestions , setSuggestions]=useState<any[]>([])

        async function fetchSuggestions(value:string){
        try{
            if(!value){
                setSuggestions([])
                return
            }
             const response = await fetch(`http://localhost:3091/api/course?search=${value}`)
             const data =await response.json()
             setSuggestions(data)

        }catch (error){
            console.log(error)
         }
        }
        useEffect(()=>{
            const timeout =setTimeout(()=>{
                fetchSuggestions(search)
            },300) //in every letter the api is not called so the timeout is of 3s this process is called Debounce
            return()=> clearTimeout(timeout)
        },[search])

        function handleSearch( value:string){
            setSearch(value)
            const params = new URLSearchParams(searchParams.toString())
            params.set("search",value)
            router.push(`/courses?${params.toString()}`)
        }
    
    return (
      <div className="relative">
        <div className="flex">
        <input type="text" placeholder="Search courses..." 
                value={search}
                onChange={(e)=> handleSearch(e.target.value)}
            className="border p-3 w-full rounded-l-xl" />
        <button type="submit" className="bg-cyan-800 p-4 text-white text-xl font-bold rounded-e-xl">
            search</button>
        </div>
        {/* suggestions */}
        {suggestions.length > 0 && (
         <div className="absolute bg-white border w-full rounded-xl mt-2 shadow-lg z-50">
            {suggestions.map((course: any) => (
                <div key={course._id}
                     onClick={() => { router.push(`/course/${course._id}`)
                    setSuggestions([])
                    }}
                    className="p-3 hover:bg-zinc-100 cursor-pointer">
                   {course.title}
                </div>
                 )
            )}
            </div>
        )}
        </div>
    )
}
      
    
