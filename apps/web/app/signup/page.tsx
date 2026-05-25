"use client"
import { authClient } from "@repo/auth/client"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Signup(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        const {data,error} = await authClient.signUp.email({
            name:name,
            email:email,
            password:password,
            callbackURL:"/login" //an optional URL to redirect to after the user signs up 
        },{
            onRequest:(ctx)=>{
                console.log("making the request")
            },
            onSuccess:(ctx)=>{
                router.push("/login") // redirect to the dashboard or sign in page 
            },
            onError:(ctx)=>{
                console.log("err",ctx)
            },
        })
        console.log("data",data)
    }
    const handleGoogleSignup = async()=>{
        const data=await authClient.signIn.social({
            provider:"google"
        })
        console.log("data",data)
    }
    
return (
        <div className="flex items-center justify-center h-screen">
       
        <form className="flex flex-col gap-5 w-md rounded-xl bg-gray-200 p-12 mx-auto" onSubmit={handleSubmit}>
             <h1 className="flex justify-center text-3xl text-gray-800 font-bold">Signup page</h1>
            <input className="border border-gray-500 p-3 rounded-lg" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter your name"/>
            <input className="border border-gray-500 p-3 rounded-lg" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
            <input className="border border-gray-500 p-3 rounded-lg" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
            <button type="submit" className="bg-blue-500 text-white text-lg p-3 rounded-lg font-bold">Signup</button>
            <h3 className="flex justify-center text-lg">or</h3>
            <button type="button" className="bg-white text-gray-800 text-lg p-3 rounded-lg font-bold" onClick={handleGoogleSignup}>signUp with Google</button>
        </form>
        </div>
  )
}