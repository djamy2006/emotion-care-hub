import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Brain, 
  Heart, 
  Activity,
  Download,
  Share,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const wellnessMetrics = [
    { title: "Overall Wellness", value: 78, change: "+12%", icon: Heart, color: "bg-secondary-accent" },
    { title: "Stress Level", value: 34, change: "-18%", icon: Brain, color: "bg-accent-warm" },
    { title: "Sleep Quality", value: 82, change: "+8%", icon: Activity, color: "bg-primary" },
    { title: "Goal Progress", value: 67, change: "+25%", icon: Target, color: "bg-secondary-accent" },
  ];

  const recentAssessments = [
    { name: "PHQ-9 Depression", score: 6, level: "Mild", date: "2024-01-20", change: -2 },
    { name: "GAD-7 Anxiety", score: 8, level: "Mild", date: "2024-01-18", change: -3 },
    { name: "Stress Assessment", score: 12, level: "Moderate", date: "2024-01-15", change: -5 },
  ];

  const goals = [
    { title: "Daily Meditation", progress: 85, target: "15 min/day", streak: 12 },
    { title: "Exercise Routine", progress: 60, target: "3x/week", streak: 4 },
    { title: "Sleep Schedule", progress: 90, target: "8 hours/night", streak: 18 },
    { title: "Mindful Breathing", progress: 45, target: "5 min/day", streak: 7 },
  ];

  const sessionHistory = [
    { date: "2024-01-22", therapist: "Dr. Sarah Johnson", type: "Video", duration: "50 min", status: "Completed" },
    { date: "2024-01-15", therapist: "Dr. Michael Brown", type: "Chat", duration: "45 min", status: "Completed" },
    { date: "2024-01-08", therapist: "Dr. Sarah Johnson", type: "Video", duration: "50 min", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Wellness Dashboard</h1>
            <p className="text-muted-foreground">Track your mental health journey and progress</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Wellness Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellnessMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-2xl font-bold">{metric.value}%</div>
                      <Badge variant="secondary" className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Weekly Progress Summary
                </CardTitle>
                <CardDescription>Your wellness trends over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-accent mb-2">7</div>
                    <p className="text-sm text-muted-foreground">Days Tracked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">4</div>
                    <p className="text-sm text-muted-foreground">Goals Achieved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-warm mb-2">2</div>
                    <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Take action to improve your wellness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="therapeutic" 
                    className="h-20 flex-col"
                    onClick={() => navigate("/assessment")}
                  >
                    <Brain className="h-6 w-6 mb-2" />
                    Take Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => navigate("/booking")}
                  >
                    <Calendar className="h-6 w-6 mb-2" />
                    Book Session
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Target className="h-6 w-6 mb-2" />
                    Set Goals
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Activity className="h-6 w-6 mb-2" />
                    Log Mood
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardDescription>Track your mental health assessments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{assessment.name}</h3>
                        <p className="text-sm text-muted-foreground">{assessment.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{assessment.score}</div>
                          <Badge variant="outline">{assessment.level}</Badge>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-medium ${assessment.change < 0 ? 'text-secondary-accent' : 'text-accent-warm'}`}>
                            {assessment.change > 0 ? '+' : ''}{assessment.change}
                          </div>
                          <p className="text-xs text-muted-foreground">vs last</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="therapeutic"
                    onClick={() => navigate("/assessment")}
                  >
                    Take New Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wellness Goals</CardTitle>
                <CardDescription>Track your progress towards better mental health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.target}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{goal.progress}%</div>
                          <p className="text-xs text-muted-foreground">{goal.streak} day streak</p>
                        </div>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="therapeutic">Set New Goal</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>Review your therapy sessions and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionHistory.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{session.therapist}</h3>
                        <p className="text-sm text-muted-foreground">{session.date} • {session.duration}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={session.type === "Video" ? "default" : "secondary"}>
                          {session.type}
                        </Badge>
                        <Badge variant="secondary">{session.status}</Badge>
                        <Button variant="outline" size="sm">View Notes</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="therapeutic"
                    onClick={() => navigate("/booking")}
                  >
                    Book New Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;