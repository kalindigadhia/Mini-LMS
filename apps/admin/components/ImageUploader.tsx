"use client"

import { useState } from "react"
import { uploadFiles } from "../utils/uploadthing"

export default function ImageUploader(
    { onUpload }:{ 
        onUpload:(url:string)=>void
    }){

    const [loading,setLoading] = useState(false)

    async function handleUpload( e:any ){
        const file = e.target.files?.[0]

        if(!file) return
        setLoading(true)

        const res = await uploadFiles("imageUploader",{
                files:[file]
            }
        )
        onUpload( res[0].ufsUrl )
        setLoading(false)
    }

    return (

        <div>
            <input 
                className="border w-50 "
                type="file"
                onChange={handleUpload}
            />
            {
                loading &&
                <p>
                    Uploading...
                </p>
            }

        </div>
    )
}