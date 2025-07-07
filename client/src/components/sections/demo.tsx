import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, Cloud, Droplets, Wind, Eye,
  Compass, Factory, Heart, RefreshCw
} from "lucide-react";

export default function Demo() {
  const [activeTab, setActiveTab] = useState("heatmap");

  const demoData = {
    location: "Kolkata, West Bengal",
    temperature: "27°",
    weather: "Rain",
    aqi: 62,
    aqiLevel: "Moderate",
    humidity: "84%",
    windSpeed: "7.7 km/h",
    visibility: "10 km"
  };

  const pollutants = ["NO₂", "CO", "SO₂", "O₃", "HCHO"];

  return (
    <section id="demo" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience the Interface</h2>
          <p className="text-xl text-muted-foreground">
            Interactive preview of real-time air quality monitoring
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-lg">{demoData.location}</span>
                  </div>
                  <div className="flex items-center text-4xl font-bold mb-2">
                    {demoData.temperature}
                    <Cloud className="h-8 w-8 text-info ml-4" />
                  </div>
                  <div className="text-muted-foreground">{demoData.weather}</div>
                </div>

                <div className="inline-flex items-center px-4 py-2 rounded-lg mb-6 bg-warning text-white font-semibold">
  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2" />
  AQI: {demoData.aqi} {demoData.aqiLevel}
</div>


                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[ 
                    { icon: Droplets, label: "Humidity", value: demoData.humidity },
                    { icon: Wind, label: "Wind", value: demoData.windSpeed },
                    { icon: Eye, label: "Visibility", value: demoData.visibility },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center">
                      <Icon className="h-8 w-8 text-info mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{label}</div>
                      <div className="text-xl font-semibold">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeTab === "heatmap" ? "default" : "secondary"}
                    size="sm"
                    className={`bg-primary text-primary-foreground hover:bg-primary/80 ${
                      activeTab === "heatmap" && "ring-2 ring-primary"
                    }`}
                    onClick={() => setActiveTab("heatmap")}
                  >
                    <Compass className="h-4 w-4 mr-1" />
                    AQI Heatmap
                  </Button>
                  <Button
                    variant={activeTab === "sources" ? "default" : "secondary"}
                    size="sm"
                    className={`bg-hazard text-white hover:bg-hazard/90 ${
                      activeTab === "sources" && "ring-2 ring-hazard"
                    }`}
                    onClick={() => setActiveTab("sources")}
                  >
                    <Factory className="h-4 w-4 mr-1" />
                    Pollution Sources
                  </Button>
                  <Button
                    variant={activeTab === "health" ? "default" : "secondary"}
                    size="sm"
                    className={`bg-warning text-white hover:bg-yellow-500 ${
                      activeTab === "health" && "ring-2 ring-yellow-400"
                    }`}
                    onClick={() => setActiveTab("health")}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Health Tips
                  </Button>
                </div>
              </div>

              {/* Right Panel */}
              <div>
                <Card className="bg-popover border border-border rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Real-Time AQI & Pollutant Heatmap</h3>
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Refresh
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {pollutants.map((p, i) => (
                        <span
                          key={p}
                          className={`px-2 py-1 rounded text-xs text-white ${
                            ["bg-red-600", "bg-yellow-600", "bg-blue-600", "bg-green-500", "bg-purple-600"][i]
                          }`}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="h-48 rounded-lg overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Heatmap"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                        <div className="p-4">
                          <p className="text-sm font-medium text-white">Interactive Pollution Heatmap</p>
                          <p className="text-xs text-white/80">Real-time satellite and ground station data</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
