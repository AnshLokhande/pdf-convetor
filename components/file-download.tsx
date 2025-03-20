"use client"

import { useState } from "react"
import { Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileDownloadProps {
  fileName: string
  fileType?: string
}

export function FileDownload({ fileName, fileType = "application/pdf" }: FileDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    // Create a blank PDF-like content (this is just a simulation)
    const content =
      "%PDF-1.5\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 21 >>\nstream\nBT /F1 12 Tf 100 700 Td (PDF Tools) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000059 00000 n\n0000000118 00000 n\n0000000217 00000 n\ntrailer << /Size 5 /Root 1 0 R >>\nstartxref\n289\n%%EOF"

    // Create a Blob from the content
    const blob = new Blob([content], { type: fileType })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = url
    link.download = fileName

    // Append the link to the body
    document.body.appendChild(link)

    // Simulate a delay for the download process
    setTimeout(() => {
      // Trigger the download
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setIsDownloading(false)
      setIsDownloaded(true)

      // Reset the downloaded state after a delay
      setTimeout(() => {
        setIsDownloaded(false)
      }, 3000)
    }, 1500)
  }

  return (
    <Button
      onClick={handleDownload}
      variant={isDownloaded ? "outline" : "default"}
      className="w-full"
      disabled={isDownloading}
    >
      {isDownloading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Downloading...
        </span>
      ) : isDownloaded ? (
        <span className="flex items-center">
          <Check className="mr-2 h-4 w-4" />
          Downloaded
        </span>
      ) : (
        <span className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download
        </span>
      )}
    </Button>
  )
}

