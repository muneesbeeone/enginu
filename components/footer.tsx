import Link from "next/link"
import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Wrench className="h-6 w-6" />
              Enginu
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed text-balance">
              A comprehensive suite of professional engineering utilities designed for civil engineers, draftsmen,
              plumbers, and HVAC technicians. All your
              essential tools in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                Engineering Tools
              </Link>
              <Link href="/3d-viewer" className="text-muted-foreground hover:text-primary transition-colors">
                3D Model Viewer
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tools</h3>
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Unit Conversion Tool</span>
              <span className="text-muted-foreground">Concrete & Steel Estimator</span>
              <span className="text-muted-foreground">Scale Calculator</span>
              <span className="text-muted-foreground">Pipe Sizing & Flow Calculator</span>
              <span className="text-muted-foreground">HVAC BTU Load Calculator</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">© 2024 Muhammed Munees. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
