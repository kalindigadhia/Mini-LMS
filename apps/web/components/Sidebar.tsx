import Link from "next/link"

export default function Sidebar(){

    return (

        <div
            className=" w-64 h-screen border-r-blue-100 p-5 bg-blue-50 ">
            <h2 className="text-2xl text-gray-700 font-bold mb-10">
                Dashboard
            </h2>
            <div className="flex flex-col gap-5">
                <Link href="/courses">
                    Browse Courses
                </Link>

                <Link href="/my-courses">
                    My Courses
                </Link>

                <Link href="/profile">
                    Profile
                </Link>

            </div>

        </div>
    )
}