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
    <div className="flex items-center justify-between py-7 px-14 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold">Mini LMS</h1>

      <nav className="flex items-center gap-6  text-lg">
        <Link href="/courses">Courses</Link>
        <Link href="/my-courses">My Courses</Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
             <Link href="/profile">Profile</Link>
            <button
             onClick={handleLogout} className="text-white font-bold ">
             Logout
            </button>
            </>
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