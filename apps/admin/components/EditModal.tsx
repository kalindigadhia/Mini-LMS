"use client"

import { useEffect, useState } from "react"

export default function EditModal({
    course,isOpen,onClose,onUpdated}:any){
        const [form,setForm] = useState({title:"",description:"",price:""})

        useEffect(()=>{
            if(course){
                setForm({
                    title: course.title || "", 
                    description:course.description || "",
                    price:course.price || ""
                })
            }
        },[course])

        if(!isOpen) return null 
        const handleChange = (e)=>{
            setForm({...form,[e.target.name]: e.target.value})
        }
        const handleSubmit= async()=>{
            const res= await fetch(`/api/course/${course._id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },body:JSON.stringify(form)
            })
            const data = await res.json()
            onUpdated(data)
            onClose()
        }
        return (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">Edit Course</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Title"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          placeholder="Description"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          placeholder="Price"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  )
}