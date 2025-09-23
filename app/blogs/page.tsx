import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import AdSense from "@/components/AdSense";

export default function BlogPage() {
  const blogs = [
    {
      title: "Top Tools Every Civil Engineer Should Use",
      date: "September 23, 2025",
      description: "Discover essential digital tools and calculators that help civil engineers improve accuracy and efficiency. This post covers everything from structural analysis software to project management platforms, ensuring your construction projects are on time and within budget. Learn how to streamline your workflow, reduce manual errors, and improve collaboration with your team.",
      keywords: "civil engineer tools, construction calculators, Engине tools"
    },
    {
      title: "How to Calculate Concrete Load Accurately",
      date: "September 20, 2025",
      description: "A step-by-step guide to calculating concrete load for buildings and structures. We'll explore dead loads, live loads, and environmental factors, providing you with the formulas and tools needed for modern engineering methods. Improve your structural analysis skills and ensure your constructions are safe and durable.",
      keywords: "concrete load calculator, civil engineering guide, Engine calculators"
    },
    {
      title: "HVAC Load Estimation Made Easy",
      date: "September 18, 2025",
      description: "Learn how to calculate HVAC BTU loads for any space, from a single room to an entire building. Our guide simplifies the process, making your HVAC planning more precise, energy efficient, and cost-effective. Discover how to optimize your heating, ventilation, and air conditioning systems for maximum comfort and minimum energy consumption.",
      keywords: "HVAC load calculator, BTU estimation, Engine tools"
    },
    {
      title: "Plumbing Pipe Size Calculator: A Complete Guide",
      date: "September 15, 2025",
      description: "Optimize your plumbing systems with our simple guide to calculating the correct pipe sizes. This article covers flow rates, pressure loss, and material considerations to ensure optimal performance for any building project. Learn how to select the right pipes for your water supply and drainage systems, reducing leaks, corrosion, and maintenance costs.",
      keywords: "plumbing calculator, pipe size guide, Engine tools"
    },
    {
      title: "Simplifying Structural Load Estimations for Beginners",
      date: "September 12, 2025",
      description: "A foundational guide to understanding and estimating structural loads. We break down the core principles of load paths, types of loads, and calculation methods, making it perfect for students and junior engineers. Learn how to analyze loads, calculate stresses, and design safe and efficient structures.",
      keywords: "structural load, engineering basics, load estimation, Engine"
    },
    {
      title: "Mastering Scale Conversions: A Draftsman's Guide",
      date: "September 10, 2025",
      description: "This article breaks down the complexities of scale conversions, offering practical tips and tricks for draftsmen. Ensure absolute precision in your technical drawings by mastering the conversion between architectural, engineering, and metric scales. Learn how to accurately scale your drawings, avoiding errors and miscommunications with your team.",
      keywords: "scale conversion, drafting, technical drawing, Engine tools"
    },
    {
      title: "The Ultimate Guide to Material Volume Calculations",
      date: "September 8, 2025",
      description: "From soil and gravel to concrete and asphalt, learn how to accurately calculate material volumes for your next big construction project. This ultimate guide provides the formulas and conversion factors you need for precise estimation. Improve your construction planning and reduce material waste by mastering material volume calculations.",
      keywords: "material volume, construction estimation, civil engineering, Engine"
    },
    {
      title: "Enhancing On-Site Productivity with Digital Engineering Tools",
      date: "September 5, 2025",
      description: "Explore how web-based utilities like Engine are revolutionizing job site efficiency. Discover how digital toolkits reduce manual errors, save valuable time, and improve collaboration among engineering and construction teams. Learn how to streamline your workflow, reduce costs, and improve project delivery timelines.",
      keywords: "digital toolkit, engineering productivity, construction tech, Engine"
    },
    {
      title: "Streamlining Your Construction Workflow with Data-Driven Calculators",
      date: "September 3, 2025",
      description: "Learn how data-driven calculators like Engine are transforming the construction industry. Discover how to automate manual calculations, reduce errors, and improve your project's bottom line. Find out how to use data to make better decisions and optimize your construction workflow.",
      keywords: "data-driven calculator, construction workflow, engineering tools, Engine"
    },
    {
      title: "Optimizing HVAC System Design with Advanced Calculators",
      date: "September 1, 2025",
      description: "Improve your HVAC system design by leveraging advanced calculators like Engine. Learn how to optimize your heating, ventilation, and air conditioning systems for maximum comfort and minimum energy consumption. Discover how to reduce energy consumption, improve indoor air quality, and create healthier environments.",
      keywords: "HVAC design, energy efficiency, comfort optimization, Engine"
    },
    {
      title: "Simplifying Structural Analysis for Construction Projects",
      date: "August 26, 2025",
      description: "Learn how to simplify structural analysis for construction projects using digital tools like Engine. Discover how to reduce manual errors, improve accuracy, and streamline your structural analysis workflow. Improve your construction project timelines, reduce costs, and ensure your structures are safe and durable.",
      keywords: "structural analysis, construction project, digital toolkit, Engine"
    },
    {
      title: "Revolutionizing Construction Estimation with AI-Powered Calculators",
      date: "August 22, 2025",
      description: "Explore how AI-powered calculators like Engine are transforming the construction estimation process. Learn how to use machine learning algorithms to automate manual calculations, reduce errors, and improve your project's bottom line. Discover how to use AI to make better decisions and optimize your construction workflow.",
      keywords: "construction estimation, AI-powered calculator, engineering tools, Engine"
    },
    {
      title: "The Future of Construction Technology: Trends, Tools, and Innovations",
      date: "August 19, 2025",
      description: "Stay ahead of the curve with our comprehensive guide to the latest construction technology trends, tools, and innovations. Learn about the future of construction technology, from AI-powered calculators to augmented reality job sites. Discover how to improve your construction workflow, reduce costs, and create safer, more efficient job sites.",
      keywords: "construction technology, future trends, engineering tools, Engine"
    }
]
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-foreground mb-12">Engineering Blogs</h1>
          
          <div className="space-y-10">
            {blogs.map((blog, index) => (
              <article key={index} className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
                <p className="text-gray-700 mb-2">{blog.description}</p>
                <p className="text-xs text-gray-400">Keywords: {blog.keywords}</p>
              </article>
            ))}
          </div>
        </div>
      </main>

      <div className="mt-12 flex justify-center">
        <AdSense
          slot="9783500294"
          className="max-w-[728px] w-full"
          adType="banner"
        />
      </div>

      <Footer />
    </div>
  );
}
