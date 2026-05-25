"use client"

import { useState } from "react";
import ImageUploader from "../../../components/ImageUploader";

export default function createCoursePage(){
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [thumbnail,setThumbnail] =useState("")

    const handleSubmit= async(e:any) =>{
        e.preventDefault()
        const response = await fetch("/api/course",{
            method:"POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,
                description,
                thumbnail,
                createdBy: "admin"
            })
        })
        const data = await response.json()
        console.log(data)
        if(!response.ok){
            alert(data.message)
            return
        }
        alert("course create successfully")
        setTitle("");
        setDescription("");
        // const text = await response.text()
        // console.log("raw response:",text)
        
        // const data =JSON.parse(text)
        // alert("course created successfully")
        //console.log(data)
        
    }
    
    return(
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-md rounded-xl bg-gray-50 p-12 mx-auto">
                <h1 className=" flex justify-center text-4xl font-bold text-gray-700">Create Course</h1>
                <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-3 rounded-lg"/>
                <textarea placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="border p-3 rounded-lg"/>

                <ImageUploader onUpload={setThumbnail}/>

                <button type="submit" className="bg-blue-500 text-xl text-white font-bold p-3 rounded-lg">Create Course</button>
            </form>
        </div>
    )
} 