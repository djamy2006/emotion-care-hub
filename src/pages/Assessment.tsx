import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  }
};

const Assessment = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAssessmentSelect = (id: string) => {
    setSelectedAssessment(id);
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
    } else {
      if (score <= 4) return { level: "Minimal", color: "bg-secondary-accent" };
      if (score <= 9) return { level: "Mild", color: "bg-accent-warm" };
      if (score <= 14) return { level: "Moderate", color: "bg-orange-500" };
      return { level: "Severe", color: "bg-red-500" };
    }
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  if (!selectedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-calm py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">Mental Health Assessments</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a clinically validated assessment to better understand your mental health
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.entries(assessments).map(([id, assessment]) => (
              <Card key={id} className="hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => handleAssessmentSelect(id)}>
                <CardHeader>
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">{assessment.questions.length} questions</Badge>
                    <Badge variant="outline">5-10 min</Badge>
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
    );
  }

  const assessment = assessments[selectedAssessment as keyof typeof assessments];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  if (isCompleted) {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score, selectedAssessment);

    return (
      <div className="min-h-screen bg-gradient-calm py-12">
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

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={() => navigate("/booking")}
                  >
                    Book Professional Session
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetAssessment}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Take Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm py-12">
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
  );
};

export default Assessment;