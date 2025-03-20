"use client"

import { useState } from "react"
import { FileUp, FileText, FileImage, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDownload } from "@/components/file-download"

export default function ConvertToPDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [convertType, setConvertType] = useState("document")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(newFiles)
    setIsComplete(false)
  }

  const handleConvert = () => {
    if (files.length === 0) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const getAcceptedFileTypes = () => {
    switch (convertType) {
      case "document":
        return {
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "application/vnd.oasis.opendocument.text": [".odt"],
          "text/plain": [".txt"],
          "text/rtf": [".rtf"],
        }
      case "spreadsheet":
        return {
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
          "text/csv": [".csv"],
        }
      case "presentation":
        return {
          "application/vnd.ms-powerpoint": [".ppt"],
          "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
          "application/vnd.oasis.opendocument.presentation": [".odp"],
        }
      case "image":
        return {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/gif": [".gif"],
          "image/bmp": [".bmp"],
          "image/tiff": [".tif", ".tiff"],
          "image/webp": [".webp"],
        }
      default:
        return {
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        }
    }
  }

  const getTabIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 mr-2" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 mr-2" />
      case "presentation":
        return <FileText className="h-4 w-4 mr-2" />
      case "image":
        return <FileImage className="h-4 w-4 mr-2" />
      default:
        return <FileText className="h-4 w-4 mr-2" />
    }
  }

  const getTabDescription = () => {
    switch (convertType) {
      case "document":
        return "Convert Word documents, text files, and RTF files to PDF."
      case "spreadsheet":
        return "Convert Excel spreadsheets and CSV files to PDF."
      case "presentation":
        return "Convert PowerPoint presentations to PDF."
      case "image":
        return "Convert images (JPG, PNG, GIF, etc.) to PDF."
      default:
        return "Convert files to PDF."
    }
  }

  return (
    <ToolLayout
      title="Convert to PDF"
      description="Convert various file formats to PDF. Support for documents, spreadsheets, presentations, and images."
      icon={<FileUp className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <Tabs
          defaultValue="document"
          onValueChange={(value) => {
            setConvertType(value)
            setFiles([])
            setIsComplete(false)
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="document" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="spreadsheet" className="flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              <span>Spreadsheets</span>
            </TabsTrigger>
            <TabsTrigger value="presentation" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Presentations</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <FileImage className="h-4 w-4 mr-2" />
              <span>Images</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">{getTabDescription()}</p>

            <FileUploadDropzone maxFiles={5} accept={getAcceptedFileTypes()} onFilesAdded={handleFilesAdded} />
          </div>
        </Tabs>

        {files.length > 0 && (
          <div className="flex flex-col space-y-4">
            <Button onClick={handleConvert} disabled={isProcessing || files.length === 0} className="w-full">
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>

            {isComplete && (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Your files have been successfully converted to PDF!
                  </AlertDescription>
                </Alert>
                {files.length === 1 ? (
                  <FileDownload fileName={`${files[0].name.split(".")[0]}.pdf`} />
                ) : (
                  <FileDownload fileName="converted-files.zip" fileType="application/zip" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

