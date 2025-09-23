import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
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
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Welcome to Enginu. We are committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and safeguard your information when you visit our website.
                Please read this privacy policy carefully. If you do not agree with the terms of this
                privacy policy, please do not access the site.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Data Collection</h2>
              <p>
                Our tools, such as the 3D Viewer and Unit Converter, are designed to be client-side.
                This means that any data you input or files you upload are processed directly in your
                browser. We do not upload, store, collect, or have access to your personal files or data
                on our servers. Your work remains your own.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Website Analytics</h2>
              <p>
                We may use third-party service providers, such as Vercel Analytics, to monitor and
                analyze the use of our Service. These services collect anonymous data, such as page
                views, referrers, and top paths, to help us understand website traffic and usage
                patterns. This data is aggregated and does not contain personally identifiable
                information.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
              <p>
                We may use cookies to help customize the site and improve your experience. A cookie is a
                string of information that a website stores on a visitor’s computer, and that the
                visitor’s browser provides to the website each time the visitor returns. You are free to
                decline our cookies if your browser permits, but some parts of our site may not work
                properly for you.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us. (You should add a
                contact method here).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

