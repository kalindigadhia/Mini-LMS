"use client"
import { authClient } from "@repo/auth/client";
import { useState } from "react";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");

    const handleSubmit =async(e:any)=>{
        e.preventDefault();
        const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: false
}, {
})
console.log("data",data)
    }
    return (
        <div className="flex items-center justify-center h-screen">
       
       <form className="flex flex-col gap-5 w-md rounded-xl bg-gray-200 p-12 mx-auto" onSubmit={handleSubmit}>
             <h1 className="flex justify-center text-3xl text-gray-800 font-bold">Login page</h1>
            <input className="border border-gray-500 p-3 rounded-lg" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
            <input className="border border-gray-500 p-3 rounded-lg" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
            <button type="submit" className="bg-blue-500 text-white text-lg p-3 rounded-lg font-bold">Login</button>
        </form>
        </div>
  )
}