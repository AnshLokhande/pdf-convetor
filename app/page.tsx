import Link from "next/link"
import { FileText, Combine, Scissors, FileDown, FileUp, Edit, Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const tools = [
    {
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one document",
      icon: <Combine className="h-8 w-8" />,
      href: "/tools/merge",
    },
    {
      title: "Split PDFs",
      description: "Extract pages or split PDF by page ranges",
      icon: <Scissors className="h-8 w-8" />,
      href: "/tools/split",
    },
    {
      title: "Compress PDFs",
      description: "Reduce file size while maintaining quality",
      icon: <FileDown className="h-8 w-8" />,
      href: "/tools/compress",
    },
    {
      title: "Convert to PDF",
      description: "Convert Word, Excel, PowerPoint, images to PDF",
      icon: <FileUp className="h-8 w-8" />,
      href: "/tools/convert-to-pdf",
    },
    {
      title: "PDF to Office",
      description: "Convert PDFs back to editable formats",
      icon: <FileText className="h-8 w-8" />,
      href: "/tools/pdf-to-office",
    },
    {
      title: "Edit PDFs",
      description: "Add text, images, annotations, or watermarks",
      icon: <Edit className="h-8 w-8" />,
      href: "/tools/edit",
    },
    {
      title: "Protect PDFs",
      description: "Add passwords or permissions to PDFs",
      icon: <Lock className="h-8 w-8" />,
      href: "/tools/protect",
    },
    {
      title: "Unlock PDFs",
      description: "Remove passwords from PDFs",
      icon: <Unlock className="h-8 w-8" />,
      href: "/tools/unlock",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-indigo-500  sm:text-4xl md:text-5xl lg:text-6xl">
                  Your PDF Toolkit
                </h1>
                <p className="mx-auto max-w-[700px] text-black-500 md:text-xl">
                  Merge, split, compress, convert, and edit PDFs for free. Fast, secure, and easy to use.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="#tools">Explore Tools</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">All PDF Tools</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Everything you need to work with PDFs in one place. Simple, fast, and secure.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {tools.map((tool) => (
                <Link key={tool.title} href={tool.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-2 text-primary group-hover:text-primary/80 transition-colors">{tool.icon}</div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg--50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose Our PDF Tools?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our tools are designed with simplicity and security in mind.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 max-w-5xl">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Secure Processing</h3>
                  <p className="text-gray-500 text-center">
                    All files are processed securely and deleted after 1 hour.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Easy to Use</h3>
                  <p className="text-gray-500 text-center">Simple interface with drag-and-drop functionality.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M2 20h.01m4 0h.01m4 0h.01m4 0h.01m4 0h.01M2 16h.01m4 0h.01m4 0h.01m4 0h.01m4 0h.01M4 12h16M4 8h16M8 4h8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Free to Use</h3>
                  <p className="text-gray-500 text-center">All basic PDF tools are completely free to use.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

