type Props = {
    title:string
    value:number
}

export default function StatsCard({title,value}:Props){
    return (
        <div className="bg-gray-100 border rounded-2xl p-6">
            <h2 className="text-zinc-600 text-lg">
                {title}
             </h2>
            <p className="text-4xl font-bold mt-3">
                {value}
            </p>
        </div>
    )
}