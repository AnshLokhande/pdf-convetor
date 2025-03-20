"use client"

import { useState } from "react"
import { FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDownload } from "@/components/file-download"

export default function PDFToOfficePage() {
  const [file, setFile] = useState<File | null>(null)
  const [convertType, setConvertType] = useState("word")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setIsComplete(false)
    } else {
      setFile(null)
    }
  }

  const handleConvert = () => {
    if (!file) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const getFileExtension = () => {
    switch (convertType) {
      case "word":
        return "docx"
      case "excel":
        return "xlsx"
      case "powerpoint":
        return "pptx"
      case "text":
        return "txt"
      default:
        return "docx"
    }
  }

  return (
    <ToolLayout
      title="PDF to Office"
      description="Convert PDF files to editable Microsoft Office formats. Extract text and formatting from your PDFs."
      icon={<FileText className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <Tabs
          defaultValue="word"
          onValueChange={(value) => {
            setConvertType(value)
            setIsComplete(false)
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="word" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Word</span>
            </TabsTrigger>
            <TabsTrigger value="excel" className="flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              <span>Excel</span>
            </TabsTrigger>
            <TabsTrigger value="powerpoint" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>PowerPoint</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Text</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              {convertType === "word" && "Convert PDF to editable Word document (.docx)"}
              {convertType === "excel" && "Convert PDF tables to Excel spreadsheet (.xlsx)"}
              {convertType === "powerpoint" && "Convert PDF to PowerPoint presentation (.pptx)"}
              {convertType === "text" && "Extract plain text from PDF (.txt)"}
            </p>

            <FileUploadDropzone
              maxFiles={1}
              accept={{
                "application/pdf": [".pdf"],
              }}
              onFilesAdded={handleFilesAdded}
            />
          </div>
        </Tabs>

        {file && (
          <div className="flex flex-col space-y-4">
            <Button onClick={handleConvert} disabled={isProcessing} className="w-full">
              {isProcessing
                ? "Converting..."
                : `Convert to ${convertType.charAt(0).toUpperCase() + convertType.slice(1)}`}
            </Button>

            {isComplete && (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Your PDF has been successfully converted!
                  </AlertDescription>
                </Alert>
                <FileDownload
                  fileName={`${file.name.split(".")[0]}.${getFileExtension()}`}
                  fileType="application/octet-stream"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

