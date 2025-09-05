import Link from "next/link"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen relative z-10">
        <div className="m-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the AI Editor</h1>
          <p className="text-lg text-gray-200 mb-6">
            Navigate to the editor to start writing with AI assistance.
          </p>
          <Link
            href="/editor"
            className="btn btn-primary"
          >
            Go to Editor
          </Link>
        </div>
      </div>

      {/* Background effects */}
      <ShootingStars />
      <StarsBackground />
    </>
  )
}
