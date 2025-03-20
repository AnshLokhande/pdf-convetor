import Link from "next/link"
import { FileText, Menu, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const tools = [
    { name: "Merge PDFs", href: "/tools/merge" },
    { name: "Split PDFs", href: "/tools/split" },
    { name: "Compress PDFs", href: "/tools/compress" },
    { name: "Convert to PDF", href: "/tools/convert-to-pdf" },
    { name: "PDF to Office", href: "/tools/pdf-to-office" },
    { name: "Edit PDFs", href: "/tools/edit" },
    { name: "Protect PDFs", href: "/tools/protect" },
    { name: "Unlock PDFs", href: "/tools/unlock" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold">PDF Tools</span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:space-x-4">
          <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-full justify-start px-2">
                  All Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 grid grid-cols-1 gap-1">
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.name} asChild>
                    <Link href={tool.href}>{tool.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex md:hidden flex-1 justify-end">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5" />
                  <span>PDF Tools</span>
                </Link>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <div className="font-bold mb-2">All Tools</div>
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="group flex w-full items-center py-2 text-sm font-medium"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
                <Link href="/about" className="group flex w-full items-center py-2 text-sm font-medium">
                  About
                </Link>
                <Link href="/faq" className="group flex w-full items-center py-2 text-sm font-medium">
                  FAQ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

