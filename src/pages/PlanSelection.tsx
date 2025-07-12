import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Phone, 
  Video,
  Calendar,
  Clock,
  Check,
  Star,
  Zap,
  Users,
  ChevronLeft
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const PlanSelection = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const payPerUseServices = [
    {
      id: "text",
      icon: MessageSquare,
      title: "Text Counselling",
      description: "24/7 text-based support with certified counsellors",
      price: "₹10",
      unit: "per minute",
      features: [
        "Instant messaging with professionals",
        "Available 24/7",
        "Response within 5 minutes",
        "Secure and private"
      ],
      color: "border-blue-200 bg-blue-50"
    },
    {
      id: "audio",
      icon: Phone,
      title: "Audio Sessions",
      description: "Voice calls with professional therapists",
      price: "₹20",
      unit: "per minute",
      features: [
        "High-quality voice calls",
        "Licensed therapists",
        "Flexible scheduling",
        "Session recordings available"
      ],
      color: "border-green-200 bg-green-50"
    },
    {
      id: "video",
      icon: Video,
      title: "Video Therapy",
      description: "Face-to-face sessions with specialists",
      price: "₹100",
      unit: "per minute",
      features: [
        "HD video quality",
        "Screen sharing support",
        "Specialist therapists",
        "Session notes included"
      ],
      color: "border-purple-200 bg-purple-50"
    }
  ];

  const appointmentPackages = [
    {
      id: "30min",
      icon: Clock,
      title: "30-Minute Session",
      description: "Perfect for focused discussions",
      price: "₹1,000",
      unit: "per session",
      duration: "30 minutes",
      features: [
        "Dedicated therapist time",
        "Structured session plan",
        "Follow-up notes",
        "Homework assignments"
      ],
      popular: false
    },
    {
      id: "60min",
      icon: Clock,
      title: "60-Minute Session",
      description: "Deep dive therapy sessions",
      price: "₹1,800",
      unit: "per session",
      duration: "60 minutes",
      features: [
        "Extended consultation time",
        "Comprehensive assessment",
        "Detailed treatment plan",
        "Progress tracking"
      ],
      popular: true
    }
  ];

  const subscriptionPlans = [
    {
      id: "5sessions",
      icon: Star,
      title: "5 Sessions Package",
      description: "Flexible counselling sessions",
      price: "₹7,000",
      unit: "valid for 3 months",
      originalPrice: "₹9,000",
      savings: "₹2,000",
      features: [
        "5 sessions of any type",
        "Mix text, audio, or video",
        "Use anytime in 3 months",
        "Priority booking",
        "Dedicated therapist matching"
      ],
      popular: true,
      color: "border-accent-warm bg-accent-warm/10"
    }
  ];

  const paymentMethods = [
    { id: "stripe", name: "Credit/Debit Card", icon: "💳" },
    { id: "upi", name: "UPI", icon: "📱" },
    { id: "phonepe", name: "PhonePe", icon: "📞" },
    { id: "googlepay", name: "Google Pay", icon: "🎯" },
    { id: "paytm", name: "Paytm", icon: "💰" }
  ];

  const handleProceedToPayment = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with payment gateway
    console.log("Proceeding to payment for plan:", planId);
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/signup")}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Signup
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Mental Health Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the plan that best fits your needs. You can always upgrade or change later.
            </p>
          </div>

            <Tabs defaultValue="payperuse" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="payperuse">Pay Per Use</TabsTrigger>
              <TabsTrigger value="appointments">Scheduled Sessions</TabsTrigger>
              <TabsTrigger value="subscription">Special Packages</TabsTrigger>
            </TabsList>

            {/* Subscription Plans */}
            <TabsContent value="subscription" className="space-y-8">
              <div className="grid gap-8">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id} className={`shadow-medium ${plan.color} relative`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-warm text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <plan.icon className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-2xl">{plan.title}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          {plan.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {plan.originalPrice}
                            </div>
                          )}
                          <div className="text-3xl font-bold text-primary">{plan.price}</div>
                          <div className="text-sm text-muted-foreground">{plan.unit}</div>
                          {plan.savings && (
                            <Badge variant="secondary" className="mt-1">
                              Save {plan.savings}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-3">What's Included:</h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-secondary-accent mr-2 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <Button 
                            onClick={() => handleProceedToPayment(plan.id)}
                            className="w-full"
                            variant="hero"
                            size="lg"
                          >
                            Choose This Plan
                          </Button>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Flexible usage • Cancel anytime
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Appointment Packages */}
            <TabsContent value="appointments" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {appointmentPackages.map((pkg) => (
                  <Card key={pkg.id} className={`shadow-medium relative ${pkg.popular ? 'border-primary' : ''}`}>
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <pkg.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-xl">{pkg.title}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                      <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                      <div className="text-sm text-muted-foreground">{pkg.unit}</div>
                      <Badge variant="outline" className="mt-2">
                        {pkg.duration}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-secondary-accent mr-2 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => handleProceedToPayment(pkg.id)}
                        className="w-full"
                        variant={pkg.popular ? "hero" : "therapeutic"}
                      >
                        Book Session
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pay Per Use */}
            <TabsContent value="payperuse" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {payPerUseServices.map((service) => (
                  <Card key={service.id} className={`shadow-medium ${service.color}`}>
                    <CardHeader className="text-center">
                      <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                      <div className="text-3xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-muted-foreground">{service.unit}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-secondary-accent mr-2 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => handleProceedToPayment(service.id)}
                        className="w-full"
                        variant="therapeutic"
                      >
                        Start Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Payment Methods */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <CardTitle>Secure Payment Options</CardTitle>
                <CardDescription>
                  We support multiple payment methods for your convenience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex flex-col items-center p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium text-center">{method.name}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    🔒 All payments are secured with 256-bit SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;