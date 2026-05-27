type Props = {
    title:string
    value:number
}

export default function StatsCard({title,value}:Props){
    return (
        <div className="bg-cyan-800 border rounded-se-2xl rounded-es-2xl p-6">
            <h2 className="text-cyan-100 font-bold text-2xl p-3">
                {title}
             </h2>
            <p className="text-white text-5xl font-bold mt-3 p-3">
                {value}
            </p>
        </div>
    )
}