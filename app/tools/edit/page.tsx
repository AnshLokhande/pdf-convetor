"use client"

import { useState } from "react"
import { Edit, Type, Image, Pencil, Eraser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { FileDownload } from "@/components/file-download"

export default function EditPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [editMode, setEditMode] = useState("text")
  const [textColor, setTextColor] = useState("#000000")
  const [fontSize, setFontSize] = useState(16)
  const [imageOpacity, setImageOpacity] = useState(100)

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setIsComplete(false)
    } else {
      setFile(null)
    }
  }

  const handleSave = () => {
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
      title="Edit PDF"
      description="Add text, images, annotations, or watermarks to your PDF documents. Make changes without needing to recreate the entire document."
      icon={<Edit className="h-6 w-6" />}
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
              <p className="text-sm text-muted-foreground">
                Note: In this demo, you can configure editing options but the actual PDF editing functionality is
                simulated.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Editing Tools</h3>

              <Tabs defaultValue="text" onValueChange={setEditMode} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text" className="flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    <span>Add Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    <span>Add Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="draw" className="flex items-center">
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Draw</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Text Content</Label>
                      <Input id="text-input" placeholder="Enter text to add to PDF" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                        <Slider
                          id="font-size"
                          value={[fontSize]}
                          min={8}
                          max={72}
                          step={1}
                          onValueChange={(value) => setFontSize(value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="text-color">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="text-color"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-12 h-8 p-0 border-0"
                          />
                          <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-upload">Upload Image</Label>
                      <Input id="image-upload" type="file" accept="image/*" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image-opacity">Opacity: {imageOpacity}%</Label>
                      <Slider
                        id="image-opacity"
                        value={[imageOpacity]}
                        min={10}
                        max={100}
                        step={1}
                        onValueChange={(value) => setImageOpacity(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Position</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">
                          Top Left
                        </Button>
                        <Button variant="outline" size="sm">
                          Top Center
                        </Button>
                        <Button variant="outline" size="sm">
                          Top Right
                        </Button>
                        <Button variant="outline" size="sm">
                          Middle Left
                        </Button>
                        <Button variant="outline" size="sm">
                          Center
                        </Button>
                        <Button variant="outline" size="sm">
                          Middle Right
                        </Button>
                        <Button variant="outline" size="sm">
                          Bottom Left
                        </Button>
                        <Button variant="outline" size="sm">
                          Bottom Center
                        </Button>
                        <Button variant="outline" size="sm">
                          Bottom Right
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="draw" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pen-color">Pen Color</Label>
                        <Input id="pen-color" type="color" defaultValue="#ff0000" className="w-full h-8 p-0 border-0" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pen-size">Pen Size</Label>
                        <Slider id="pen-size" defaultValue={[3]} min={1} max={20} step={1} />
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Pencil className="h-4 w-4 mr-2" />
                        Pen
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eraser className="h-4 w-4 mr-2" />
                        Eraser
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-md h-64 flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        PDF preview and drawing canvas would appear here in a real implementation
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col space-y-4">
              <Button onClick={handleSave} disabled={isProcessing} className="w-full">
                {isProcessing ? "Saving..." : "Save Changes"}
              </Button>

              {isComplete && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your PDF has been successfully edited!
                    </AlertDescription>
                  </Alert>
                  <FileDownload fileName={`edited-${file.name}`} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

