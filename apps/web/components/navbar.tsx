"use client"

import { authClient } from "@repo/auth/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // 👈 prevents hydration mismatch

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between p-5 bg-blue-50">
      <h1 className="text-2xl font-bold">Mini LMS</h1>

      <nav className="flex items-center gap-5">
        <Link href="/courses">Courses</Link>
        <Link href="/my-courses">MyCourses</Link>

        <div className="flex items-center gap-3">
          {session ? (
            <button
             onClick={handleLogout} className="text-red-400 ">
             Logout
            </button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}