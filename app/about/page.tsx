import Link from "next/link"
import { FileText, Shield, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-5xl py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About PDF Tools</h1>
        <p className="text-muted-foreground text-lg">
          PDF Tools is a comprehensive online platform that provides a suite of tools for working with PDF documents.
          Our mission is to make PDF editing accessible, secure, and easy for everyone.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Secure Processing</h2>
          <p className="text-muted-foreground">
            All files are processed securely on our servers and automatically deleted after 1 hour. We never access the
            content of your files or share them with third parties.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Fast and Reliable</h2>
          <p className="text-muted-foreground">
            Our tools are designed to process your files quickly and efficiently. We use the latest technologies to
            ensure high-quality results every time.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Comprehensive Tools</h2>
          <p className="text-muted-foreground">
            From merging and splitting to compressing and converting, we offer a complete set of tools for all your PDF
            needs. Our intuitive interface makes it easy to get the job done.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-2 w-fit rounded-full bg-primary/10 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Time-Saving</h2>
          <p className="text-muted-foreground">
            No need to install software or learn complex applications. Our web-based tools are available 24/7 and can be
            accessed from any device with an internet connection.
          </p>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Try our PDF tools today and see how easy it is to work with PDF documents.
          </p>
          <Button asChild size="lg">
            <Link href="/">Explore Tools</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Is PDF Tools free to use?</h3>
            <p className="text-muted-foreground">
              Yes, all basic PDF tools are completely free to use. We may offer premium features in the future, but our
              core tools will always remain free.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">How secure are my files?</h3>
            <p className="text-muted-foreground">
              Your files are processed securely on our servers and automatically deleted after 1 hour. We use HTTPS
              encryption to ensure that your files are transferred securely.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">What is the maximum file size?</h3>
            <p className="text-muted-foreground">
              The maximum file size for free users is 100MB per file. This limit may be increased for premium users in
              the future.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Can I use PDF Tools on my mobile device?</h3>
            <p className="text-muted-foreground">
              Yes, PDF Tools is fully responsive and works on all devices, including smartphones and tablets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

