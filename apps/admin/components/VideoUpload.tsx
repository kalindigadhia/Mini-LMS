"use client"
import { UploadButton } from "../utils/uploadthing"

export default function VideoUpload({onChange}:any
){
    return (
        <UploadButton
        className=""
            endpoint="videoUploader"
            onClientUploadComplete={( res )=>{
                onChange(
                    res[0].ufsUrl
                )
            }}
            appearance={{
                button:" bg-gray-400 text-white p-1 px-2 rounded-s"
            }}
        />
    )
}