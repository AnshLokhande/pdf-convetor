"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileDownload } from "@/components/file-download"

export default function ProtectPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [permissions, setPermissions] = useState({
    printing: true,
    copying: true,
    editing: false,
    commenting: true,
    formFilling: true,
  })

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setIsComplete(false)
    } else {
      setFile(null)
    }
  }

  const handleProtect = () => {
    if (!file || !password || password !== confirmPassword) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const passwordsMatch = password === confirmPassword
  const passwordValid = password.length >= 4

  return (
    <ToolLayout
      title="Protect PDF"
      description="Add password protection and set permissions for your PDF documents. Control who can view, edit, print, or copy content from your PDFs."
      icon={<Lock className="h-6 w-6" />}
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
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Password Protection</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Set Password</Label>
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
                    {password && !passwordValid && (
                      <p className="text-xs text-destructive">Password must be at least 4 characters</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword && !passwordsMatch && (
                      <p className="text-xs text-destructive">Passwords do not match</p>
                    )}
                    {confirmPassword && passwordsMatch && (
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Passwords match
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Permissions</h3>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="printing"
                      checked={permissions.printing}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, printing: checked === true })}
                    />
                    <Label htmlFor="printing">Allow printing</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copying"
                      checked={permissions.copying}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, copying: checked === true })}
                    />
                    <Label htmlFor="copying">Allow copying of content</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="editing"
                      checked={permissions.editing}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, editing: checked === true })}
                    />
                    <Label htmlFor="editing">Allow editing of content</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="commenting"
                      checked={permissions.commenting}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, commenting: checked === true })}
                    />
                    <Label htmlFor="commenting">Allow commenting</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="form-filling"
                      checked={permissions.formFilling}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, formFilling: checked === true })}
                    />
                    <Label htmlFor="form-filling">Allow form filling</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                onClick={handleProtect}
                disabled={isProcessing || !passwordValid || !passwordsMatch}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Protect PDF"}
              </Button>

              {isComplete && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your PDF has been successfully protected with a password!
                    </AlertDescription>
                  </Alert>
                  <FileDownload fileName={`protected-${file.name}`} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

