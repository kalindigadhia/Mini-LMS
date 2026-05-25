import { auth } from "@repo/auth/server"

import { headers } from "next/headers"

async function getUser(){

    const session = await auth.api.getSession({
        headers:await headers()
    })
    return session?.user
}
async function getStats( userId:string){

   const response = await fetch(`http://localhost:3212/api/my-courses?userId=${userId}`,
      {
         cache:"no-store"
      }
   )
   const enrollments = await response.json()

   return {
      enrolled:
      enrollments.length
   }
}

export default async function ProfilePage(){

    const user = await getUser()
    const stats = await getStats(user.id)
    return (

        <div className="p-10">
            <div
                className ="flex items-center gap-5 mb-10">
                <img src={ user?.image || "https://avatar.iran.liara.run/public" }

                    className="w-24 h-24 rounded-full object-cover"/>
                <div>
                    <h1 className ="text-4xl font-bold " >
                        {user?.name}
                    </h1>

                    <p className="text-zinc-400 mt-2 "> {user?.email}</p>

                    <p className="mt-2"> Role:{" "}
                        {user?.role}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5 ">
                <div className="border p-5 rounded-2xl">
                    <h2 className=" text-zinc-400">Enrolled Courses</h2>
                    <p className="text-4xl font-bold mt-3 ">
                         {stats.enrolled}
                    </p>
                 </div>
            </div>
         </div>
    )
}