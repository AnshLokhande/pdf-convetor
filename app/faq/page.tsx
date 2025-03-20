import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container max-w-3xl py-12 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Find answers to common questions about PDF Tools and our services.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is PDF Tools free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, all basic PDF tools are completely free to use. We may offer premium features in the future, but our
            core tools will always remain free.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How secure are my files?</AccordionTrigger>
          <AccordionContent>
            Your files are processed securely on our servers and automatically deleted after 1 hour. We use HTTPS
            encryption to ensure that your files are transferred securely. We never access the content of your files or
            share them with third parties.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is the maximum file size?</AccordionTrigger>
          <AccordionContent>
            The maximum file size for free users is 100MB per file. This limit may be increased for premium users in the
            future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I use PDF Tools on my mobile device?</AccordionTrigger>
          <AccordionContent>
            Yes, PDF Tools is fully responsive and works on all devices, including smartphones and tablets. Our
            interface is designed to be user-friendly on all screen sizes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How long are my files stored?</AccordionTrigger>
          <AccordionContent>
            All uploaded files are automatically deleted from our servers after 1 hour. We recommend downloading your
            processed files immediately after they are ready.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
          <AccordionContent>
            No, you don't need to create an account to use our basic tools. Simply upload your files and start
            processing them right away.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What file formats are supported?</AccordionTrigger>
          <AccordionContent>
            Our tools primarily work with PDF files. For conversion tools, we support various formats including Word
            documents (.doc, .docx), Excel spreadsheets (.xls, .xlsx), PowerPoint presentations (.ppt, .pptx), images
            (.jpg, .png, .gif, etc.), and text files (.txt).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Can I process multiple files at once?</AccordionTrigger>
          <AccordionContent>
            Yes, many of our tools support batch processing. For example, you can merge multiple PDFs, convert multiple
            files to PDF, or compress multiple PDFs at once.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>How do I report a bug or suggest a feature?</AccordionTrigger>
          <AccordionContent>
            You can contact us through our Contact page or send an email to support@pdftools.example.com. We appreciate
            your feedback and are constantly working to improve our tools.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>Is there a desktop version of PDF Tools?</AccordionTrigger>
          <AccordionContent>
            Currently, PDF Tools is only available as a web application. However, we are considering developing desktop
            and mobile apps in the future. Stay tuned for updates!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

