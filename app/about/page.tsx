import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import AdSense from "@/components/AdSense"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-foreground mb-8">About Enginu</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="leading-relaxed">
              Enginu is a comprehensive, web-based platform dedicated to providing essential engineering utilities for
              professionals across a multitude of trades. Our mission is to streamline complex calculations, simplify
              project estimations, and offer powerful visualization tools that enhance productivity and precision.
              Whether you're in the office or on the job site, Enginu is your reliable digital toolkit.
            </p>

            <h2 className="text-2xl font-bold text-foreground !mt-12">Our Mission</h2>
            <p>
              Our core mission is to empower engineers, technicians, and trade workers with accessible, accurate, and
              easy-to-use digital tools. We believe that by removing the friction of manual calculations and data
              lookup, we can help professionals save valuable time, reduce errors, and focus on what they do best:
              designing, building, and maintaining the world around us.
            </p>

            <h2 className="text-2xl font-bold text-foreground !mt-12">Who We Serve</h2>
            <p>
              Enginu is built to be versatile, catering to a wide range of disciplines within the engineering and
              construction industries. Our specialized toolsets are designed for:
            </p>
            <ul>
              <li>
                <strong>Civil Engineers:</strong> For everything from material volume calculations to structural load
                estimations.
              </li>
              <li><strong>Draftsmen:</strong> Aiding in scale conversions, grid layouts, and technical specifications.</li>
              <li><strong>Plumbers:</strong> With calculators for pipe sizing, flow rates, and system pressure.</li>
              <li>
                <strong>A/C & HVAC Technicians:</strong> For accurate BTU calculations, duct sizing, and load
                analysis.
              </li>
            </ul>

            <p>
              ...and many other professionals who rely on precise data for their daily work.
            </p>
          </div>
        </div>
      </main>
      <div className="mt-6 flex justify-center">
          <AdSense
            slot="9783500294"
            className="max-w-728px w-full"
            adType="banner"
          />
        </div>
      <Footer />
    </div>
  )
}
