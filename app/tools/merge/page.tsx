"use client"

import { useState } from "react"
import { Combine, MoveUp, MoveDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploadDropzone } from "@/components/file-upload-dropzone"
import { ToolLayout } from "@/components/tool-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { FileDownload } from "@/components/file-download"

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(newFiles)
    setIsComplete(false)
  }

  const handleMerge = () => {
    if (files.length < 2) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const moveFileUp = (index: number) => {
    if (index === 0) return
    const newFiles = [...files]
    const temp = newFiles[index]
    newFiles[index] = newFiles[index - 1]
    newFiles[index - 1] = temp
    setFiles(newFiles)
  }

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return
    const newFiles = [...files]
    const temp = newFiles[index]
    newFiles[index] = newFiles[index + 1]
    newFiles[index + 1] = temp
    setFiles(newFiles)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(files)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  }

  return (
    <ToolLayout
      title="Merge PDFs"
      description="Combine multiple PDF files into a single document. Arrange the files in the order you want them to appear in the final PDF."
      icon={<Combine className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <FileUploadDropzone maxFiles={10} onFilesAdded={handleFilesAdded} />

        {files.length > 1 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Arrange Files</h3>
              <p className="text-sm text-muted-foreground">Drag and drop to reorder</p>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="pdf-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {files.map((file, index) => (
                      <Draggable key={`${file.name}-${index}`} draggableId={`${file.name}-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between bg-muted p-3 rounded-md"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium bg-primary/10 text-primary w-6 h-6 flex items-center justify-center rounded-full">
                                {index + 1}
                              </span>
                              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                                {file.name}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveFileUp(index)}
                                disabled={index === 0}
                              >
                                <MoveUp className="h-4 w-4" />
                                <span className="sr-only">Move up</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveFileDown(index)}
                                disabled={index === files.length - 1}
                              >
                                <MoveDown className="h-4 w-4" />
                                <span className="sr-only">Move down</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {files.length > 1 ? (
          <div className="flex flex-col space-y-4">
            <Button onClick={handleMerge} disabled={isProcessing || files.length < 2} className="w-full">
              {isProcessing ? "Processing..." : "Merge PDFs"}
            </Button>

            {isComplete && (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Your PDFs have been successfully merged!
                  </AlertDescription>
                </Alert>
                <FileDownload fileName="merged-document.pdf" />
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Please upload at least 2 PDF files to merge them.</p>
        )}
      </div>
    </ToolLayout>
  )
}

