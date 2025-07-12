import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, RotateCcw, User, Mail, Phone, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AIChat } from "@/components/AIChat";

// Pre-assessment questionnaire to identify suitable tests
const preAssessmentQuestions = [
  {
    id: 1,
    question: "How would you describe your current mood most days?",
    options: [
      { value: "sad", label: "Sad, down, or hopeless", tests: ["phq-9", "dass-21"] },
      { value: "anxious", label: "Nervous, worried, or on edge", tests: ["gad-7", "dass-21"] },
      { value: "stressed", label: "Overwhelmed or stressed", tests: ["pss", "k6"] },
      { value: "empty", label: "Empty or disconnected", tests: ["phq-9", "who-5"] },
      { value: "mixed", label: "A mix of different emotions", tests: ["dass-21", "k6"] }
    ]
  },
  {
    id: 2,
    question: "Which area of your life is most affected?",
    options: [
      { value: "work", label: "Work or studies", tests: ["pss", "gad-7"] },
      { value: "relationships", label: "Relationships and social connections", tests: ["phq-9", "who-5"] },
      { value: "daily", label: "Daily activities and self-care", tests: ["phq-9", "dass-21"] },
      { value: "sleep", label: "Sleep and energy levels", tests: ["phq-9", "k6"] },
      { value: "physical", label: "Physical health and symptoms", tests: ["dass-21", "pss"] }
    ]
  },
  {
    id: 3,
    question: "When did you first notice these concerns?",
    options: [
      { value: "recent", label: "Within the last few weeks", tests: ["gad-7", "pss"] },
      { value: "months", label: "A few months ago", tests: ["phq-9", "dass-21"] },
      { value: "long", label: "Many months or years", tests: ["dass-21", "who-5"] },
      { value: "always", label: "I've always felt this way", tests: ["phq-9", "k6"] },
      { value: "episodes", label: "It comes and goes in episodes", tests: ["gad-7", "dass-21"] }
    ]
  }
];

const assessments = {
  "phq-9": {
    title: "PHQ-9 Depression Scale",
    description: "Patient Health Questionnaire for Depression",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself or that you are a failure",
      "Trouble concentrating on things",
      "Moving or speaking slowly, or being fidgety",
      "Thoughts that you would be better off dead"
    ],
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  "gad-7": {
    title: "GAD-7 Anxiety Scale",
    description: "Generalized Anxiety Disorder 7-item Scale",
    questions: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it's hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen"
    ],
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  "dass-21": {
    title: "DASS-21 Scale",
    description: "Depression, Anxiety and Stress Scale",
    questions: [
      "I found it hard to wind down",
      "I was aware of dryness of my mouth",
      "I couldn't seem to experience any positive feeling at all",
      "I experienced breathing difficulty",
      "I found it difficult to work up the initiative to do things",
      "I tended to over-react to situations",
      "I experienced trembling (eg, in the hands)",
      "I felt that I was using a lot of nervous energy",
      "I was worried about situations in which I might panic",
      "I felt that I had nothing to look forward to",
      "I found myself getting agitated",
      "I found it difficult to relax",
      "I felt down-hearted and blue",
      "I was intolerant of anything that kept me from getting on with what I was doing",
      "I felt I was close to panic",
      "I was unable to become enthusiastic about anything",
      "I felt I wasn't worth much as a person",
      "I felt that I was rather touchy",
      "I was aware of the action of my heart in the absence of physical exertion",
      "I felt scared without any good reason",
      "I felt that life was meaningless"
    ],
    options: [
      { value: 0, label: "Did not apply to me at all" },
      { value: 1, label: "Applied to me to some degree" },
      { value: 2, label: "Applied to me to a considerable degree" },
      { value: 3, label: "Applied to me very much" }
    ]
  },
  "k6": {
    title: "K6 Psychological Distress Scale",
    description: "Kessler Psychological Distress Scale",
    questions: [
      "How often did you feel nervous?",
      "How often did you feel hopeless?",
      "How often did you feel restless or fidgety?",
      "How often did you feel so depressed that nothing could cheer you up?",
      "How often did you feel that everything was an effort?",
      "How often did you feel worthless?"
    ],
    options: [
      { value: 0, label: "None of the time" },
      { value: 1, label: "A little of the time" },
      { value: 2, label: "Some of the time" },
      { value: 3, label: "Most of the time" },
      { value: 4, label: "All of the time" }
    ]
  },
  "pss": {
    title: "Perceived Stress Scale",
    description: "Measures how stressful situations are perceived",
    questions: [
      "How often have you been upset because of something that happened unexpectedly?",
      "How often have you felt that you were unable to control important things in your life?",
      "How often have you felt nervous and stressed?",
      "How often have you felt confident about your ability to handle your personal problems?",
      "How often have you felt that things were going your way?",
      "How often have you found that you could not cope with all the things that you had to do?",
      "How often have you been able to control irritations in your life?",
      "How often have you felt that you were on top of things?",
      "How often have you been angered because of things that happened that were outside of your control?",
      "How often have you felt difficulties were piling up so high that you could not overcome them?"
    ],
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Almost Never" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Fairly Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  "who-5": {
    title: "WHO-5 Well-Being Index",
    description: "World Health Organization Well-Being Index",
    questions: [
      "I have felt cheerful and in good spirits",
      "I have felt calm and relaxed",
      "I have felt active and vigorous",
      "I woke up feeling fresh and rested",
      "My daily life has been filled with things that interest me"
    ],
    options: [
      { value: 0, label: "At no time" },
      { value: 1, label: "Some of the time" },
      { value: 2, label: "Less than half of the time" },
      { value: 3, label: "More than half of the time" },
      { value: 4, label: "Most of the time" },
      { value: 5, label: "All of the time" }
    ]
  }
};

const Assessment = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showPreAssessment, setShowPreAssessment] = useState(true);
  const [preAssessmentAnswers, setPreAssessmentAnswers] = useState<string[]>([]);
  const [recommendedTests, setRecommendedTests] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState({
    age: "",
    gender: "",
    email: "",
    phone: ""
  });

  const handleAssessmentSelect = (id: string) => {
    setSelectedAssessment(id);
    setShowUserDetails(true);
  };

  const startAssessment = () => {
    setShowUserDetails(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const assessment = assessments[selectedAssessment as keyof typeof assessments];
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getScoreInterpretation = (score: number, type: string) => {
    if (type === "phq-9") {
      if (score <= 4) return { level: "Minimal", color: "bg-secondary-accent" };
      if (score <= 9) return { level: "Mild", color: "bg-accent-warm" };
      if (score <= 14) return { level: "Moderate", color: "bg-orange-500" };
      if (score <= 19) return { level: "Moderately Severe", color: "bg-red-500" };
      return { level: "Severe", color: "bg-red-700" };
    } else if (type === "gad-7") {
      if (score <= 4) return { level: "Minimal", color: "bg-secondary-accent" };
      if (score <= 9) return { level: "Mild", color: "bg-accent-warm" };
      if (score <= 14) return { level: "Moderate", color: "bg-orange-500" };
      return { level: "Severe", color: "bg-red-500" };
    } else if (type === "dass-21") {
      if (score <= 9) return { level: "Normal", color: "bg-secondary-accent" };
      if (score <= 13) return { level: "Mild", color: "bg-accent-warm" };
      if (score <= 20) return { level: "Moderate", color: "bg-orange-500" };
      if (score <= 27) return { level: "Severe", color: "bg-red-500" };
      return { level: "Extremely Severe", color: "bg-red-700" };
    } else if (type === "k6") {
      if (score <= 7) return { level: "Low", color: "bg-secondary-accent" };
      if (score <= 12) return { level: "Moderate", color: "bg-accent-warm" };
      return { level: "High", color: "bg-red-500" };
    } else if (type === "pss") {
      if (score <= 13) return { level: "Low Stress", color: "bg-secondary-accent" };
      if (score <= 26) return { level: "Moderate Stress", color: "bg-accent-warm" };
      return { level: "High Stress", color: "bg-red-500" };
    } else if (type === "who-5") {
      if (score >= 13) return { level: "Good Well-being", color: "bg-secondary-accent" };
      if (score >= 9) return { level: "Moderate Well-being", color: "bg-accent-warm" };
      return { level: "Poor Well-being", color: "bg-red-500" };
    }
    return { level: "Unknown", color: "bg-gray-500" };
  };

  const handlePreAssessmentAnswer = (questionIndex: number, value: string) => {
    const newAnswers = [...preAssessmentAnswers];
    newAnswers[questionIndex] = value;
    setPreAssessmentAnswers(newAnswers);
  };

  const generateRecommendations = () => {
    const testCounts: Record<string, number> = {};
    
    preAssessmentAnswers.forEach((answer, index) => {
      const question = preAssessmentQuestions[index];
      const selectedOption = question.options.find(opt => opt.value === answer);
      if (selectedOption) {
        selectedOption.tests.forEach(test => {
          testCounts[test] = (testCounts[test] || 0) + 1;
        });
      }
    });
    
    const sortedTests = Object.entries(testCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([test]) => test);
    
    setRecommendedTests(sortedTests);
    setShowPreAssessment(false);
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
    setShowUserDetails(false);
    setShowPreAssessment(true);
    setPreAssessmentAnswers([]);
    setRecommendedTests([]);
    setUserDetails({ age: "", gender: "", email: "", phone: "" });
  };

  // Pre-assessment questionnaire
  if (showPreAssessment) {
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <Card className="shadow-medium">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Find Your Right Assessment</CardTitle>
                  <CardDescription>
                    Answer a few quick questions to help us recommend the most suitable mental health assessment for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {preAssessmentQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="font-semibold text-lg">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <Button
                            key={option.value}
                            variant={preAssessmentAnswers[index] === option.value ? "therapeutic" : "outline"}
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => handlePreAssessmentAnswer(index, option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="pt-6">
                    <Button 
                      variant="therapeutic" 
                      className="w-full"
                      onClick={generateRecommendations}
                      disabled={preAssessmentAnswers.length < preAssessmentQuestions.length}
                    >
                      Get My Recommended Assessments
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    );
  }

  if (!selectedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => setShowPreAssessment(true)}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Questionnaire
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">Recommended Assessments</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your responses, these assessments are most suitable for you
            </p>
          </div>

          {/* Recommended Tests */}
          {recommendedTests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-center mb-6">AI Recommended for You</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {recommendedTests.map((id) => {
                  const assessment = assessments[id as keyof typeof assessments];
                  return (
                    <Card key={id} className="hover:shadow-medium transition-all duration-300 cursor-pointer border-primary/50 bg-gradient-to-br from-primary/5 to-accent-warm/5" onClick={() => handleAssessmentSelect(id)}>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <Badge variant="default">Recommended</Badge>
                        </div>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <CardDescription className="text-sm">{assessment.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <Badge variant="secondary">{assessment.questions.length} questions</Badge>
                          <Badge variant="outline">5-15 min</Badge>
                        </div>
                        <Button variant="therapeutic" className="w-full">
                          Start Assessment
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Available Tests */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">All Available Assessments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {Object.entries(assessments).map(([id, assessment]) => (
                <Card key={id} className="hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => handleAssessmentSelect(id)}>
                  <CardHeader>
                    <CardTitle className="text-lg">{assessment.title}</CardTitle>
                    <CardDescription className="text-sm">{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">{assessment.questions.length} questions</Badge>
                      <Badge variant="outline">5-15 min</Badge>
                    </div>
                    <Button variant="therapeutic" className="w-full">
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          </div>
        </div>
        <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    );
  }

  if (showUserDetails) {
    const assessment = assessments[selectedAssessment as keyof typeof assessments];
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={resetAssessment}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Assessments
              </Button>
              
              <Card className="shadow-medium">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-primary/10 to-accent-warm/10 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Optional Information
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Providing these details helps us give you better insights (completely optional and confidential)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Age Range
                      </Label>
                      <Select value={userDetails.age} onValueChange={(value) => setUserDetails(prev => ({...prev, age: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46-55">46-55</SelectItem>
                          <SelectItem value="56-65">56-65</SelectItem>
                          <SelectItem value="65+">65+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Gender
                      </Label>
                      <Select value={userDetails.gender} onValueChange={(value) => setUserDetails(prev => ({...prev, gender: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails(prev => ({...prev, email: e.target.value}))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails(prev => ({...prev, phone: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Privacy Notice:</p>
                    <p>Your responses are completely confidential and encrypted. This assessment is for informational purposes only and is not a substitute for professional medical advice.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setShowUserDetails(false)}>
                      Skip Details
                    </Button>
                    <Button variant="therapeutic" className="flex-1" onClick={startAssessment}>
                      Start Assessment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    );
  }

  const assessment = assessments[selectedAssessment as keyof typeof assessments];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  if (isCompleted) {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score, selectedAssessment);

    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-secondary-accent">Assessment Complete</CardTitle>
                <CardDescription>{assessment.title}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-primary">{score}</div>
                  <Badge className={`${interpretation.color} text-white text-lg px-4 py-2`}>
                    {interpretation.level}
                  </Badge>
                </div>

                <div className="bg-muted p-6 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">What this means:</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score indicates {interpretation.level.toLowerCase()} symptoms. 
                    These results are for informational purposes only and should not replace professional medical advice.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Professional Help CTA */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent-warm/10 p-6 rounded-lg text-center">
                    <h3 className="font-semibold text-lg mb-2">Ready to get professional help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Join our platform to access certified mental health professionals, 
                      flexible therapy options, and a supportive community.
                    </p>
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up for Professional Support
                    </Button>
                  </div>

                  {/* Call Request CTA */}
                  <div className="bg-gradient-to-r from-accent-warm/10 to-secondary-accent/10 p-6 rounded-lg text-center">
                    <h3 className="font-semibold text-lg mb-2">Want to speak with someone today?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Request a call from our mental health team to discuss your results 
                      and explore personalized treatment options.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        // This would normally trigger a call request form or direct to contact
                        alert("Call request feature - would normally open a contact form or schedule a call");
                      }}
                    >
                      Request a Call from Our Team
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={resetAssessment}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Take Another Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
        <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={resetAssessment}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Assessments
            </Button>
            <h1 className="text-2xl font-bold text-foreground mb-2">{assessment.title}</h1>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">
                {assessment.questions[currentQuestion]}
              </CardTitle>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by this?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assessment.options.map((option) => (
                <Button
                  key={option.value}
                  variant={answers[currentQuestion] === option.value ? "therapeutic" : "outline"}
                  className="w-full justify-start text-left h-auto py-4"
                  onClick={() => handleAnswer(option.value)}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm opacity-70">{option.value} points</div>
                  </div>
                </Button>
              ))}

              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  variant="therapeutic" 
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                >
                  {currentQuestion === assessment.questions.length - 1 ? "Complete" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
      <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Assessment;