import { createUploadthing ,type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {

    imageUploader: f({
        image:{
            maxFileSize:"4MB"
        }

    })
    .middleware(async()=>{
        return{}
    })
    .onUploadComplete( async({file})=>{

            console.log( "file url",file.ufsUrl )

            return { url:file.ufsUrl }
        }),
    videoUploader:f({
        video:{
            maxFileSize:"512MB"
         }
    })
    .middleware(async()=>{
         return {}
    })
    .onUploadComplete(async({file})=>{
    return {
         url:file.ufsUrl
    }
}),

} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter