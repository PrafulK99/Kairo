"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { UploadCloud, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function UploadPage() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile)
        }
    }

    const handleRemoveFile = () => {
        setFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Upload Resume
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-12 transition-colors hover:bg-muted/80",
                                isDragging && "border-primary bg-primary/5"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="mb-4 rounded-full bg-background p-4 shadow-sm">
                                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="mb-2 text-sm font-medium text-foreground">
                                Click or drag to upload
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PDF files only (max 10MB)
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </div>
                    ) : (
                        <div className="relative flex items-center gap-4 rounded-lg border border-border bg-background p-4">
                            <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Resume uploaded successfully
                                </p>
                            </div>
                            <button
                                onClick={handleRemoveFile}
                                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        disabled={!file}
                        onClick={() => router.push("/job")}
                    >
                        Next: Add Job
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
