import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, BarChart3, Shield, CheckCircle, Star, TrendingUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Corporate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: Users,
      title: "Team Assessments",
      description: "Comprehensive mental health screenings for your entire workforce",
      benefits: ["Anonymous reporting", "Aggregate insights", "Risk identification"]
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights into your organization's mental health metrics",
      benefits: ["Wellness trends", "ROI tracking", "Custom reports"]
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security and privacy protection",
      benefits: ["Data encryption", "Secure access", "Audit trails"]
    },
    {
      icon: Calendar,
      title: "Flexible Programs",
      description: "Customizable wellness programs tailored to your organization",
      benefits: ["On-site sessions", "Virtual workshops", "24/7 support"]
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$15",
      period: "per employee/month",
      description: "Essential mental health support for small teams",
      features: [
        "Basic assessments",
        "Monthly wellness reports",
        "Email support",
        "Up to 50 employees"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "$25",
      period: "per employee/month",
      description: "Comprehensive wellness program for growing companies",
      features: [
        "Advanced assessments",
        "Real-time analytics",
        "Dedicated support",
        "Custom branding",
        "Integration support",
        "Up to 500 employees"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact for pricing",
      description: "Tailored solutions for large organizations",
      features: [
        "All Professional features",
        "Custom assessments",
        "White-label solution",
        "API access",
        "On-site training",
        "Unlimited employees"
      ],
      recommended: false
    }
  ];

  const testimonials = [
    {
      company: "TechCorp Solutions",
      quote: "MindCare has transformed our workplace culture. Employee satisfaction increased by 40% in just 6 months.",
      author: "Sarah Johnson",
      role: "HR Director",
      employees: "500+ employees"
    },
    {
      company: "Global Manufacturing",
      quote: "The analytics dashboard gives us invaluable insights into our team's wellbeing. Highly recommended.",
      author: "Michael Chen",
      role: "Chief People Officer",
      employees: "2,000+ employees"
    }
  ];

  const stats = [
    { value: "87%", label: "Improvement in employee wellbeing" },
    { value: "65%", label: "Reduction in sick days" },
    { value: "92%", label: "Employee program satisfaction" },
    { value: "3.2x", label: "ROI on wellness investment" }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Corporate Wellness</h1>
            <p className="text-muted-foreground">Comprehensive mental health solutions for your organization</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-8 pb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Transform Your Workplace Wellbeing</h2>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Empower your team with evidence-based mental health support, 
                comprehensive analytics, and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Schedule Demo
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Get Pricing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="case-studies">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-secondary-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-secondary-accent mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Platform Features</CardTitle>
                <CardDescription>Everything you need to support your team's mental wellness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary-accent">Assessment Tools</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />PHQ-9 Depression Scale</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />GAD-7 Anxiety Scale</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Stress Level Monitoring</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Burnout Assessment</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Custom Questionnaires</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary-accent">Analytics & Reporting</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Real-time Dashboard</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Trend Analysis</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Department Insights</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />ROI Tracking</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Custom Reports</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary-accent">Support Services</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />24/7 Crisis Support</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Licensed Counselors</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Group Therapy Sessions</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Wellness Workshops</li>
                      <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2 text-secondary-accent" />Manager Training</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-muted-foreground">Flexible pricing to fit organizations of all sizes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.recommended ? 'border-secondary-accent shadow-medium' : ''}`}>
                  {plan.recommended && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary-accent">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-secondary-accent mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.recommended ? "therapeutic" : "outline"} 
                      className="w-full"
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="case-studies" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Success Stories</h2>
              <p className="text-muted-foreground">See how organizations are transforming their workplace wellness</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-warm text-accent-warm" />
                      ))}
                    </div>
                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                      <Badge variant="outline">{testimonial.employees}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-secondary-accent/5 border-secondary-accent/20">
              <CardContent className="pt-6 text-center">
                <Building2 className="h-12 w-12 mx-auto text-secondary-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Workplace?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of organizations already improving their team's mental wellness
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="therapeutic">Schedule a Demo</Button>
                  <Button variant="outline">Download Brochure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Corporate;