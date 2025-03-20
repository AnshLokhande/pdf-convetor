"use client"

import { useState } from "react"
import { Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDownload } from "@/components/file-download"

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [splitMethod, setSplitMethod] = useState("all")
  const [pageRanges, setPageRanges] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      // In a real implementation, we would get the actual page count
      setTotalPages(Math.floor(Math.random() * 20) + 5)
      setIsComplete(false)
    } else {
      setFile(null)
      setTotalPages(0)
    }
  }

  const handleSplit = () => {
    if (!file) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  return (
    <ToolLayout
      title="Split PDF"
      description="Extract pages or split PDF by page ranges. Create multiple PDFs from a single document."
      icon={<Scissors className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <FileUploadDropzone maxFiles={1} onFilesAdded={handleFilesAdded} />

        {file && totalPages > 0 && (
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                <span className="font-medium">Selected file:</span> {file.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Total pages:</span> {totalPages}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Split Options</h3>

              <Tabs defaultValue="simple" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simple">Simple Split</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Split</TabsTrigger>
                </TabsList>
                <TabsContent value="simple" className="space-y-4 pt-4">
                  <RadioGroup defaultValue="all" onValueChange={setSplitMethod}>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="all">Extract all pages (one PDF per page)</Label>
                        <p className="text-sm text-muted-foreground">
                          Creates {totalPages} separate PDF files, one for each page
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="even" id="even" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="even">Extract even pages</Label>
                        <p className="text-sm text-muted-foreground">Creates a PDF with pages 2, 4, 6, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="odd" id="odd" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="odd">Extract odd pages</Label>
                        <p className="text-sm text-muted-foreground">Creates a PDF with pages 1, 3, 5, etc.</p>
                      </div>
                    </div>
                  </RadioGroup>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-ranges">Page Ranges</Label>
                    <Input
                      id="page-ranges"
                      placeholder="e.g., 1-3, 5, 7-9"
                      value={pageRanges}
                      onChange={(e) => setPageRanges(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Specify page ranges separated by commas. For example, "1-3, 5, 7-9" will create a PDF with pages
                      1, 2, 3, 5, 7, 8, and 9.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Split by page count</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={() => setSplitMethod("every-2")}>
                        Every 2 pages
                      </Button>
                      <Button variant="outline" onClick={() => setSplitMethod("every-5")}>
                        Every 5 pages
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col space-y-4">
              <Button onClick={handleSplit} disabled={isProcessing} className="w-full">
                {isProcessing ? "Processing..." : "Split PDF"}
              </Button>

              {isComplete && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your PDF has been successfully split!
                    </AlertDescription>
                  </Alert>
                  <FileDownload fileName="split-pages.zip" fileType="application/zip" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

