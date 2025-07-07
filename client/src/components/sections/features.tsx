// features.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, TrendingUp, Heart, History, Factory, Bell
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time AQI Mapping",
      description: "Hyperlocal air quality data combining ground stations and satellite sources",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Predictive Forecasting",
      description: "24–72 hour forecasts using meteorological data & ML",
      color: "text-info"
    },
    {
      icon: Heart,
      title: "Health Recommendations",
      description: "Personalized alerts and advice for your well-being",
      color: "text-warning"
    },
    {
      icon: History,
      title: "Historical Analysis",
      description: "Trend visualizations and location-based insights",
      color: "text-purple-400"
    },
    {
      icon: Factory,
      title: "Pollution Source Mapping",
      description: "Track emissions from traffic, industry, and fires",
      color: "text-red-500"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Notifications for AQI spikes and emergency levels",
      color: "text-success"
    }
  ];

  return (
    <section id="features" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Air Quality Intelligence</h2>
          <p className="text-xl text-muted-foreground">
            Advanced technology meets intuitive design
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <Card key={index} className="glass-card hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
