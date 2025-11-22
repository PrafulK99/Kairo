"use client"

import { useState, useRef } from "react"
import { UploadCloud, FileText, X, Briefcase, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function UploadPage() {
    // State
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [jobType, setJobType] = useState<"text" | "url">("text")
    const [jobText, setJobText] = useState("")
    const [jobUrl, setJobUrl] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Validation
    const isJobTextValid = jobText.length >= 30
    const isJobUrlValid = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(jobUrl)
    const isJobValid = jobType === "text" ? isJobTextValid : isJobUrlValid
    const canGenerate = file !== null && isJobValid

    // Handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile)
        }
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

    const handleGenerate = () => {
        if (!canGenerate) return

        console.log("Generating Resume with:", {
            file: file?.name,
            jobType,
            jobContent: jobType === "text" ? jobText : jobUrl
        })

        // TODO: Connect to API
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
            <Card className="w-full max-w-2xl border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Create Your Tailored Resume</CardTitle>
                    <CardDescription className="text-lg">
                        Upload your resume and tell us about the job.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    {/* Section 1: Resume Upload */}
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">1. Upload Resume</Label>
                        {!file ? (
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-10 transition-all hover:bg-muted/50",
                                    isDragging && "border-primary bg-primary/5 scale-[1.01]"
                                )}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="mb-4 rounded-full bg-background p-4 shadow-sm ring-1 ring-border">
                                    <UploadCloud className="h-8 w-8 text-primary" />
                                </div>
                                <p className="mb-1 text-lg font-medium text-foreground">
                                    Click or drag to upload
                                </p>
                                <p className="text-sm text-muted-foreground">
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
                            <div className="relative flex items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-sm transition-all hover:border-primary/50">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-base font-medium text-foreground">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                                    </p>
                                </div>
                                <button
                                    onClick={handleRemoveFile}
                                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section 2: Job Input */}
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">2. Job Details</Label>
                        <Tabs
                            defaultValue="text"
                            className="w-full"
                            onValueChange={(val) => setJobType(val as "text" | "url")}
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="text" className="gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Paste Description
                                </TabsTrigger>
                                <TabsTrigger value="url" className="gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    Paste URL
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="text" className="mt-4 space-y-2">
                                <Textarea
                                    placeholder="Paste the full job description here..."
                                    className="min-h-[150px] resize-none text-base leading-relaxed"
                                    rows={6}
                                    value={jobText}
                                    onChange={(e) => setJobText(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground text-right">
                                    {jobText.length} / 30 characters minimum
                                </p>
                            </TabsContent>

                            <TabsContent value="url" className="mt-4 space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="https://example.com/careers/job-123"
                                        className="h-12 text-base"
                                        value={jobUrl}
                                        onChange={(e) => setJobUrl(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Enter the direct link to the job posting.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>

                </CardContent>
                <CardFooter className="pb-8">
                    <Button
                        className="w-full h-14 text-lg font-semibold shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                        size="lg"
                        disabled={!canGenerate}
                        onClick={handleGenerate}
                    >
                        Generate Tailored Resume
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
