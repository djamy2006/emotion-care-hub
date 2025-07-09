import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, BarChart3, Settings, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const systemStats = [
    { title: "Total Users", value: "2,847", icon: Users, change: "+12%" },
    { title: "Active Sessions", value: "156", icon: Clock, change: "+8%" },
    { title: "Expert Approval", value: "23", icon: Shield, change: "+5" },
    { title: "System Health", value: "99.9%", icon: CheckCircle, change: "+0.1%" },
  ];

  const recentActivity = [
    { id: 1, type: "user_signup", description: "New user registration: sarah.johnson@email.com", time: "2 minutes ago" },
    { id: 2, type: "expert_application", description: "Expert application from Dr. Michael Brown", time: "15 minutes ago" },
    { id: 3, type: "system_alert", description: "High server load detected", time: "1 hour ago" },
    { id: 4, type: "payment", description: "Payment processed: $89.99", time: "2 hours ago" },
  ];

  const pendingExperts = [
    { id: 1, name: "Dr. Sarah Wilson", specialty: "Anxiety Disorders", submitted: "2024-01-15" },
    { id: 2, name: "Dr. Michael Brown", specialty: "Depression Therapy", submitted: "2024-01-14" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Trauma Counseling", submitted: "2024-01-13" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">System management and oversight</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="experts">Experts</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
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

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-secondary-accent rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="therapeutic" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Review Expert Applications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Active Users: 2,847</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline">Export Data</Button>
                      <Button variant="therapeutic">Add User</Button>
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">User Directory</h3>
                    <p className="text-muted-foreground mb-4">Search, filter, and manage user accounts</p>
                    <Button variant="therapeutic">View All Users</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expert Applications</CardTitle>
                <CardDescription>Review and approve new expert applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingExperts.map((expert) => (
                    <div key={expert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{expert.name}</p>
                        <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                        <p className="text-xs text-muted-foreground">Submitted: {expert.submitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button variant="therapeutic" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage blog posts, resources, and educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Content Library</h3>
                  <p className="text-muted-foreground mb-4">Create and manage educational resources</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="therapeutic">Add Blog Post</Button>
                    <Button variant="outline">Manage Resources</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Security</h3>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Audit Logs
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Platform</h3>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      General Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics Config
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

export default Admin;