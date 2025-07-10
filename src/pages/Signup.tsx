import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Users, 
  MessageSquare, 
  Phone, 
  Video,
  Calendar,
  Brain,
  Shield,
  Clock,
  Star
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const features = [
    {
      icon: MessageSquare,
      title: "Text Counselling",
      description: "24/7 text-based counselling with certified therapists",
      price: "₹10/min"
    },
    {
      icon: Phone,
      title: "Audio Sessions",
      description: "Voice calls with professional counsellors",
      price: "₹20/min"
    },
    {
      icon: Video,
      title: "Video Therapy",
      description: "Face-to-face video sessions with licensed therapists",
      price: "₹100/min"
    },
    {
      icon: Calendar,
      title: "Scheduled Appointments",
      description: "Book structured therapy sessions",
      price: "From ₹1000"
    },
    {
      icon: Brain,
      title: "Mental Health Assessments",
      description: "Comprehensive psychological evaluations",
      price: "Included"
    },
    {
      icon: Users,
      title: "Support Community",
      description: "Connect with others on similar journeys",
      price: "Included"
    }
  ];

  const benefits = [
    "Access to certified mental health professionals",
    "Flexible payment options - pay per minute or book packages",
    "Complete privacy and confidentiality",
    "24/7 availability for text counselling",
    "Personalized treatment plans",
    "Progress tracking and reports"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = () => {
    // For now, navigate to plan selection
    // In real implementation, this would create account first
    navigate("/plan-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Start Your Mental Wellness Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands who have found support and healing through our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Signup Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>
                  Get instant access to professional mental health support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSignup}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  Create Account & Choose Plan
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Sign in here
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features & Benefits */}
            <div className="space-y-8">
              {/* Key Benefits */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-accent-warm" />
                    Why Choose Our Platform?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Services Overview */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>
                    Choose from flexible options that fit your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                        <feature.icon className="h-8 w-8 text-primary flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm">{feature.title}</div>
                          <div className="text-xs text-muted-foreground">{feature.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card className="shadow-medium bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium">HIPAA Compliant & Secure</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Your privacy and data security are our top priority
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;