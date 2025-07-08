import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Zap, Users, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    id: "phq-9",
    title: "PHQ-9 Depression Scale",
    description: "Assess depression symptoms with this clinically validated 9-question assessment.",
    icon: Brain,
    duration: "5-7 min",
    questions: 9,
    validated: true,
    category: "Depression",
  },
  {
    id: "gad-7",
    title: "GAD-7 Anxiety Scale",
    description: "Evaluate anxiety levels with this trusted 7-question screening tool.",
    icon: Heart,
    duration: "3-5 min",
    questions: 7,
    validated: true,
    category: "Anxiety",
  },
  {
    id: "asrs",
    title: "ADHD Self-Report Scale",
    description: "Screen for ADHD symptoms with this comprehensive assessment.",
    icon: Zap,
    duration: "8-10 min",
    questions: 18,
    validated: true,
    category: "ADHD",
  },
];

export const AssessmentPreview = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-calm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Start Your Journey with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              Free Assessment
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take clinically validated assessments to better understand your mental health. 
            No signup required - get insights in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {assessments.map((assessment, index) => (
            <Card 
              key={assessment.id} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary-soft rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <assessment.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{assessment.title}</CardTitle>
                <div className="flex justify-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {assessment.duration}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {assessment.questions} questions
                  </Badge>
                  {assessment.validated && (
                    <Badge variant="outline" className="text-xs text-secondary-accent border-secondary-accent">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Validated
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="mb-6 text-sm leading-relaxed">
                  {assessment.description}
                </CardDescription>
                <Button 
                  variant="therapeutic" 
                  className="w-full"
                  onClick={() => navigate(`/assessment?type=${assessment.id}`)}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="hover:shadow-soft transition-all duration-300"
            onClick={() => navigate("/assessment")}
          >
            View All Assessments
          </Button>
        </div>

        {/* Benefits section */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Clinically Validated</h3>
              <p className="text-sm text-muted-foreground">
                All assessments are based on established clinical tools used by professionals worldwide.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations and insights based on your assessment results.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-accent-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your responses are encrypted and protected. Take assessments anonymously if preferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};