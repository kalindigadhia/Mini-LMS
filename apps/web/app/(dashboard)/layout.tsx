
export default function DashboardLayout(
    { children}:{
        children:React.ReactNode
    }
){

    return (
        <div>
            <div className="flex">
               
                <div className="flex-1 py-10 px-40">
                    {children}
                </div>
            </div>
        </div>
    )
}