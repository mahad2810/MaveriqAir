// navigation.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Leaf, Download, Menu } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Features", href: "features" },
    { label: "Demo", href: "demo" },
    { label: "Technology", href: "technology" },
    { label: "API", href: "api" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-popover backdrop-blur-md shadow-sm" : "bg-background"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
  <img
  src="/MaveriqAir-Logo.png"
  alt="MaveriqAir Logo"
  className="h-10 w-10 object-contain sm:h-12 sm:w-12"
/>

  <span className="text-xl font-bold text-foreground">MaveriqAir</span>
</div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="h-4 w-4 mr-2" />
              Get App
            </Button>
          </div>

          {/* Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-popover text-popover-foreground">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-left text-lg text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </button>
                ))}
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 neon-glow"
                  onClick={() => {}}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Get App
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
