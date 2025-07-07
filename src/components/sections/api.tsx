// api.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Building, Hospital, GraduationCap, Smartphone } from "lucide-react";

export default function Api() {
  const integrations = [
    {
      icon: Building,
      title: "City Government Dashboards",
      color: "text-info"
    },
    {
      icon: Hospital,
      title: "Healthcare Systems",
      color: "text-destructive"
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      color: "text-success"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      color: "text-accent"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="api" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Developer API Access</h2>
          <p className="text-xl text-muted-foreground">
            Integrate air quality data into your applications and services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">RESTful API</h3>
              <p className="text-muted-foreground mb-6">
                Access real-time and historical air quality data with our comprehensive API
              </p>

              <div className="bg-black/80 rounded-lg p-4 text-white text-sm font-mono mb-6 border border-border">
                <div className="text-success">GET</div>
                <div className="text-info">https://api.aqimap.com/v1/current</div>
                <div className="text-muted-foreground">?lat=22.5726&lon=88.3639</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow"
                  onClick={scrollToContact}
                >
                  Get API Key
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Integration Partners</h3>
              <p className="text-muted-foreground mb-6">
                Trusted by cities, schools, and healthcare organizations
              </p>

              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <integration.icon className={`h-6 w-6 ${integration.color}`} />
                    <span className="text-muted-foreground">{integration.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
