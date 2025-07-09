import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, DollarSign, Star, Video, MessageSquare, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExpertDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const upcomingSessions = [
    { id: 1, client: "Sarah M.", time: "10:00 AM", type: "Video", status: "confirmed" },
    { id: 2, client: "John D.", time: "2:00 PM", type: "Chat", status: "pending" },
    { id: 3, client: "Emily R.", time: "4:30 PM", type: "Video", status: "confirmed" },
  ];

  const stats = [
    { title: "Total Sessions", value: "156", icon: Users, change: "+12%" },
    { title: "This Month", value: "$4,200", icon: DollarSign, change: "+8%" },
    { title: "Avg Rating", value: "4.9", icon: Star, change: "+0.1" },
    { title: "Response Time", value: "< 2h", icon: Clock, change: "-15min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Expert Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-secondary-accent">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  You have {upcomingSessions.length} sessions scheduled for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-secondary-accent rounded-full"></div>
                        <div>
                          <p className="font-medium">{session.client}</p>
                          <p className="text-sm text-muted-foreground">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={session.type === "Video" ? "default" : "secondary"}>
                          {session.type === "Video" ? <Video className="h-3 w-3 mr-1" /> : <MessageSquare className="h-3 w-3 mr-1" />}
                          {session.type}
                        </Badge>
                        <Badge variant={session.status === "confirmed" ? "secondary" : "outline"}>
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Manage your upcoming and past sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
                    <Button variant="therapeutic">Schedule New Session</Button>
                  </div>
                  
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{session.client}</p>
                          <p className="text-sm text-muted-foreground">{session.time} - {session.type} Session</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="therapeutic" size="sm">Start Session</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>View and manage your client relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Client Directory</h3>
                  <p className="text-muted-foreground mb-4">Manage client profiles, treatment plans, and progress notes</p>
                  <Button variant="therapeutic">Add New Client</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Expert Settings
                </CardTitle>
                <CardDescription>Manage your availability, rates, and profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Availability</h3>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Set Weekly Hours
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Block Time Off
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profile & Rates</h3>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Update Rates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpertDashboard;