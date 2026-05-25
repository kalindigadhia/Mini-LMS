"use client"

export default function ProgressBar(
    { percentage }:{ percentage:number }
){
    return (

        <div className="mt-5">
            <div className="flex justify-between mb-2">
                <span>
                    Progress
                </span>
                <span>
                    {percentage}%
                </span>

            </div>

            <div className="w-full h-4 bg-zinc-700 rounded-full">

                <div
                    className="h-4 bg-green-500 rounded-full"
                    style={{
                        width:`${percentage}%`
                    }}
                />

            </div>

        </div>
    )
}