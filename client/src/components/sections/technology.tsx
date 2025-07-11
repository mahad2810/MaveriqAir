// technology.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Satellite, Cloud, BarChart, Brain, AlertTriangle, MapPin } from "lucide-react";

export default function Technology() {
  const technologies = [
    {
      icon: Satellite,
      title: "Satellite Pollutant Mapping",
      description: "Sentinel-5P data via Google Earth Engine (NO₂, CO, SO₂, O₃, etc.)",
      color: "bg-blue-500 text-background"
    },
    {
      icon: Cloud,
      title: "Weather Forecasting",
      description: "Real-time and historical weather data via Meteostat API",
      color: "bg-green-500 text-background"
    },
    {
      icon: BarChart,
      title: "CPCB Ground Station AQI",
      description: "Live AQI and pollutant metrics from 700+ CPCB stations",
      color: "bg-red-500 text-background"
    },
    {
      icon: Brain,
      title: "Machine Learning Forecasting",
      description: "XGBoost model for AQI prediction using weather and pollutant trends",
      color: "bg-yellow-300 text-black"
    },
    {
      icon: AlertTriangle,
      title: "Fire & Emission Data",
      description: "VIIRS satellite fire detection via NASA FIRMS API",
      color: "bg-orange-500 text-background"
    },
    {
      icon: MapPin,
      title: "Location & Map Intelligence",
      description: "OpenStreetMap for roads/industries, OpenCage for geocoding",
      color: "bg-purple-600 text-background"
    }
  ];

  return (
    <section id="technology" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Built on Trusted Data Sources
          </h2>
          <p className="text-xl text-muted-foreground">
            Leveraging global and national environmental datasets for accuracy and impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Satellite data visualization" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Satellite Integration</h3>
                <p className="text-sm text-muted-foreground">Pollutant heatmaps from Sentinel-5P via GEE</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Weather station monitoring" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Ground & Weather Stations</h3>
                <p className="text-sm text-muted-foreground">Data from CPCB, Meteostat, and OSM overlays</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${tech.color}`}>
                  <tech.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">{tech.title}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
