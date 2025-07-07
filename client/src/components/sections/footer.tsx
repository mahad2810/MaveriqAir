// footer.tsx
import { Leaf } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Web App", href: "#demo" },
      { label: "API Documentation", href: "#api" },
      { label: "Mobile App", href: "#cta" },
      { label: "Pricing", href: "#contact" }
    ],
    resources: [
      { label: "Documentation", href: "#api" },
      { label: "Health Guidelines", href: "#" },
      { label: "Data Sources", href: "#technology" },
      { label: "Research", href: "#" }
    ],
    contact: [
      { label: "Support", href: "#contact" },
      { label: "Partnership", href: "#contact" },
      { label: "Press", href: "#contact" },
      { label: "Careers", href: "#contact" }
    ]
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-popover text-popover-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">AQI Map</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Hyperlocal air quality monitoring and forecasting.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="#"><FaTwitter className="hover:text-white" /></a>
              <a href="#"><FaGithub className="hover:text-white" /></a>
              <a href="#"><FaLinkedin className="hover:text-white" /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links], idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-4 capitalize">{section}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {links.map(({ label, href }, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(href)}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          &copy; 2024 AQI Map. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
}
