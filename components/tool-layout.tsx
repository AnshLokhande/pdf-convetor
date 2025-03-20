import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
  icon: ReactNode
}

export function ToolLayout({ title, description, children, icon }: ToolLayoutProps) {
  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="text-foreground">{title}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl">{description}</p>
      </div>

      <div className="border rounded-lg p-6 bg-card">{children}</div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="font-medium mb-2">About this tool</h3>
        <p className="text-sm text-muted-foreground">
          This tool processes your files securely. All uploaded files are automatically deleted after 1 hour to ensure
          your privacy. We do not store or access the content of your files.
        </p>
      </div>
    </div>
  )
}

