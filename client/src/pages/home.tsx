import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Demo from "@/components/sections/demo";
import Technology from "@/components/sections/technology";
import Health from "@/components/sections/health";
import Api from "@/components/sections/api";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/sections/footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      
      {/* Problem Statement Section */}
      <section className="py-16 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              The Air Quality Data Gap
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              While most AQI apps focus on large metropolitan areas, millions in small towns and rural areas lack access to granular, real-time air quality information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border border-hazard">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-hazard mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Limited Coverage</h3>
                <p className="text-muted-foreground">
                  Ground stations concentrated in major cities, leaving rural areas uninformed
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border border-warning">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Delayed Updates</h3>
                <p className="text-muted-foreground">
                  Existing solutions often provide outdated information when real-time data is critical
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border border-info">
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 text-info mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Health Guidance</h3>
                <p className="text-muted-foreground">
                  Raw data without actionable health recommendations or personalized advice
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Features />
      <Demo />
      <Technology />
      <Health />
      <Api />
      <Testimonials />
      <CTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
