// contact-form.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  isApiRequest: z.boolean().default(false)
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
      isApiRequest: false
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await contactMutation.mutateAsync(data);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground">
            Ready to integrate air quality data into your project? Let's talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">contact@aqimap.com</p>
                  <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground">Mon–Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">
                    Tech Hub, Sector V<br />
                    Salt Lake City, Kolkata<br />
                    West Bengal 700091, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 glass-card">
              <h4 className="font-medium mb-3">Partnership Opportunities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Government agencies and municipalities</li>
                <li>• Healthcare organizations</li>
                <li>• Educational institutions</li>
                <li>• Environmental research groups</li>
                <li>• Mobile app developers</li>
              </ul>
            </div>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {["name", "email", "organization", "message"].map((fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof ContactFormData}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{fieldName === "organization" ? "Organization (Optional)" : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                          <FormControl>
                            {fieldName === "message" ? (
                              <Textarea placeholder="Tell us about your project..." rows={4} {...field} />
                            ) : (
                              <Input type={fieldName === "email" ? "email" : "text"} {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <FormField
                    control={form.control}
                    name="isApiRequest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="leading-tight">
                          <FormLabel>I’m interested in API access</FormLabel>
                          <p className="text-sm text-muted-foreground">Check this if you want developer API access</p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full neon-glow" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : <><Send className="h-4 w-4 mr-2" />Send Message</>}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
