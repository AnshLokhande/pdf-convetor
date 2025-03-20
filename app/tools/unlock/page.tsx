"use client"

import { useState } from "react"
import { Unlock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileDownload } from "@/components/file-download"

export default function UnlockPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setIsComplete(false)
      setError(null)
    } else {
      setFile(null)
    }
  }

  const handleUnlock = () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    // Simulate processing
    setTimeout(() => {
      // For demo purposes, always succeed if password is provided
      if (password) {
        setIsProcessing(false)
        setIsComplete(true)
      } else {
        setIsProcessing(false)
        setError("Password is required to unlock this PDF.")
      }
    }, 2000)
  }

  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password protection from PDF files. Unlock password-protected PDFs to enable editing, printing, and copying."
      icon={<Unlock className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <FileUploadDropzone
          maxFiles={1}
          accept={{
            "application/pdf": [".pdf"],
          }}
          onFilesAdded={handleFilesAdded}
        />

        {file && (
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                <span className="font-medium">Selected file:</span> {file.name}
              </p>
              <p className="text-sm text-muted-foreground">Enter the password to unlock this PDF file.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">PDF Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <Button onClick={handleUnlock} disabled={isProcessing} className="w-full">
                {isProcessing ? "Unlocking..." : "Unlock PDF"}
              </Button>

              {isComplete && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your PDF has been successfully unlocked!
                    </AlertDescription>
                  </Alert>
                  <FileDownload fileName={`unlocked-${file.name}`} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

