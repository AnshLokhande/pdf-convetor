"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, File, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploadDropzoneProps {
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  onFilesAdded: (files: File[]) => void
}

export function FileUploadDropzone({
  maxFiles = 1,
  maxSize = 100 * 1024 * 1024, // 100MB default
  accept = {
    "application/pdf": [".pdf"],
  },
  onFilesAdded,
}: FileUploadDropzoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      // Check if adding these files would exceed the max files limit
      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`)
        return
      }

      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      // Add the files
      const newFiles = [...files, ...acceptedFiles]
      setFiles(newFiles)
      onFilesAdded(newFiles)

      // Clear progress after "upload" completes
      setTimeout(() => {
        clearInterval(interval)
        setUploadProgress(100)
      }, 2000)
    },
    [files, maxFiles, onFilesAdded],
  )

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onFilesAdded(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0]
      if (rejection?.errors[0]?.code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB.`)
      } else if (rejection?.errors[0]?.code === "file-invalid-type") {
        setError("Invalid file type. Please upload a PDF file.")
      } else {
        setError("There was an error uploading your file.")
      }
    },
  })

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-lg font-medium">{isDragActive ? "Drop the files here" : "Drag & drop files here"}</p>
            <p className="text-sm text-muted-foreground">or click to browse files from your computer</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {maxFiles === 1 ? "Upload a PDF file" : `Upload up to ${maxFiles} PDF files`}
            <br />
            Max file size: {maxSize / (1024 * 1024)}MB
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files:</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-muted p-3 rounded-md">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

