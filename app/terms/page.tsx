import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Welcome to Enginu! These terms and conditions outline the rules and regulations for the use
                of Enginu's Website and services. By accessing this website, we assume you accept these
                terms and conditions. Do not continue to use Enginu if you do not agree to all of the terms
                and conditions stated on this page.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Intellectual Property Rights</h2>
              <p>
                Other than the content you own (such as uploaded 3D models), under these Terms, Enginu
                and/or its licensors own all the intellectual property rights and materials contained in
                this Website. You are granted a limited license only for purposes of viewing and using the
                material and tools contained on this Website.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Publishing any Website material in any other media without attribution;</li>
                <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>Using this Website in any way that is or may be damaging to this Website;</li>
                <li>
                  Using this Website contrary to applicable laws and regulations, or in any way that may
                  cause harm to the Website, or to any person or business entity;
                </li>
                <li>
                  Engaging in any data mining, data harvesting, data extracting or any other similar
                  activity in relation to this Website;
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Your Content</h2>
              <p>
                In these Terms and Conditions, "Your Content" shall mean any 3D model data or other
                material you choose to upload to this Website. For services like the 3D Viewer, Your
                Content is processed entirely within your browser using client-side technologies. We do not
                upload, store, or retain your files on our servers. You retain full ownership and
                responsibility for Your Content.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. No Warranties</h2>
              <p>
                This Website and its tools are provided "as is," with all faults, and Enginu expresses no
                representations or warranties of any kind related to this Website or the materials
                contained on this Website. The calculations and visualizations are for informational
                purposes only and should not be relied upon for critical applications without independent
                verification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

