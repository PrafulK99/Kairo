import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Kairo — Precision-tailored resumes for every job.
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your resume → Paste a job → Get a tailored resume + cover
            letter in seconds.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/upload">
            <Button size="lg" className="h-12 px-8 text-lg">
              Upload Resume
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
