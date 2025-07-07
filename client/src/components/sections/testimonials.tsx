// testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, GraduationCap, Activity } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      icon: Stethoscope,
      name: "Dr. Priya Sharma",
      role: "Respiratory Specialist",
      content: "Finally, accurate air quality data for my patients in rural areas. The health recommendations are spot-on.",
      color: "bg-primary"
    },
    {
      icon: GraduationCap,
      name: "Rajesh Kumar",
      role: "School Principal",
      content: "We use AQI Map to make informed decisions about outdoor activities. The forecasting helps us plan ahead.",
      color: "bg-info text-black"
    },
    {
      icon: Activity,
      name: "Maya Patel",
      role: "Fitness Enthusiast",
      content: "The real-time alerts help me plan my morning runs. I never worry about air quality anymore.",
      color: "bg-warning text-black"
    }
  ];

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Communities
          </h2>
          <p className="text-xl text-muted-foreground">
            Real impact on health and environmental awareness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${testimonial.color}`}>
                    <testimonial.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
