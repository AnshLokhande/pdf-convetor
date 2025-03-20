"use client"

import { useState } from "react"
import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileDownload } from "@/components/file-download"

export default function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressionLevel, setCompressionLevel] = useState(70)
  const [compressionPreset, setCompressionPreset] = useState("medium")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setOriginalSize(files[0].size)
      setIsComplete(false)
    } else {
      setFile(null)
      setOriginalSize(0)
      setCompressedSize(0)
    }
  }

  const handleCompress = () => {
    if (!file) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      // Simulate compression result based on level
      const reduction = compressionLevel / 100
      setCompressedSize(Math.floor(originalSize * (1 - reduction * 0.8)))

      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handlePresetChange = (value: string) => {
    setCompressionPreset(value)
    switch (value) {
      case "low":
        setCompressionLevel(30)
        break
      case "medium":
        setCompressionLevel(70)
        break
      case "high":
        setCompressionLevel(90)
        break
      default:
        setCompressionLevel(70)
    }
  }

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce the file size of your PDF documents while maintaining quality. Perfect for sharing via email or uploading to websites."
      icon={<FileDown className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <FileUploadDropzone maxFiles={1} onFilesAdded={handleFilesAdded} />

        {file && (
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                <span className="font-medium">Selected file:</span> {file.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Original size:</span> {formatFileSize(originalSize)}
              </p>
              {isComplete && (
                <p className="text-sm">
                  <span className="font-medium">Compressed size:</span> {formatFileSize(compressedSize)}
                  <span className="text-green-600 dark:text-green-400 ml-2">
                    ({Math.round((1 - compressedSize / originalSize) * 100)}% reduction)
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Compression Options</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Compression Preset</Label>
                  <RadioGroup value={compressionPreset} onValueChange={handlePresetChange} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Compression Level: {compressionLevel}%</Label>
                  </div>
                  <Slider
                    value={[compressionLevel]}
                    min={10}
                    max={100}
                    step={1}
                    onValueChange={(value) => setCompressionLevel(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Better Quality</span>
                    <span>Smaller Size</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button onClick={handleCompress} disabled={isProcessing} className="w-full">
                {isProcessing ? "Compressing..." : "Compress PDF"}
              </Button>

              {isComplete && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your PDF has been successfully compressed!
                    </AlertDescription>
                  </Alert>
                  <FileDownload fileName={`compressed-${file.name}`} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

