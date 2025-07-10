import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Heart, Calendar, Plus, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("forums");

  const forumCategories = [
    { name: "General Support", posts: 1247, members: 892, description: "Share experiences and find support" },
    { name: "Anxiety & Stress", posts: 934, members: 567, description: "Discuss anxiety management techniques" },
    { name: "Depression Support", posts: 756, members: 423, description: "Connect with others facing similar challenges" },
    { name: "Mindfulness & Meditation", posts: 445, members: 334, description: "Share mindfulness practices and tips" },
    { name: "Success Stories", posts: 223, members: 189, description: "Celebrate progress and achievements" },
  ];

  const supportGroups = [
    { 
      id: 1, 
      name: "Morning Meditation Circle", 
      description: "Start your day with guided meditation", 
      time: "Daily at 8:00 AM",
      members: 45,
      type: "Daily"
    },
    { 
      id: 2, 
      name: "Anxiety Support Group", 
      description: "Weekly support for anxiety management", 
      time: "Wednesdays at 7:00 PM",
      members: 23,
      type: "Weekly"
    },
    { 
      id: 3, 
      name: "Creative Therapy Workshop", 
      description: "Express yourself through art and creativity", 
      time: "Fridays at 6:00 PM",
      members: 18,
      type: "Weekly"
    },
  ];

  const recentPosts = [
    { 
      id: 1, 
      title: "How I overcame my social anxiety", 
      author: "Sarah M.", 
      category: "Success Stories",
      replies: 23,
      likes: 67,
      time: "2 hours ago"
    },
    { 
      id: 2, 
      title: "Meditation techniques that actually work", 
      author: "Mike D.", 
      category: "Mindfulness & Meditation",
      replies: 15,
      likes: 43,
      time: "4 hours ago"
    },
    { 
      id: 3, 
      title: "Finding hope during difficult times", 
      author: "Emily R.", 
      category: "General Support",
      replies: 31,
      likes: 89,
      time: "6 hours ago"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground">Connect, share, and support each other on your wellness journey</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        {/* Community Guidelines Banner */}
        <Card className="mb-6 border-secondary-accent/20 bg-secondary-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-secondary-accent mt-0.5" />
              <div>
                <h3 className="font-semibold text-secondary-accent">Community Guidelines</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a safe space for support and healing. Please be respectful, kind, and remember that community support 
                  is not a substitute for professional help.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="forums" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Trending Discussions
                    </CardTitle>
                    <CardDescription>Popular conversations in the community</CardDescription>
                  </div>
                  <Button variant="therapeutic">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium hover:text-primary transition-colors">{post.title}</h3>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>by {post.author} • {post.time}</span>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {post.replies}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forumCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-medium transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {category.posts} posts
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {category.members} members
                        </span>
                      </div>
                      <Button variant="outline" size="sm">View Forum</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Support Groups</h2>
                <p className="text-muted-foreground">Join moderated groups for structured support and healing</p>
              </div>
              <Button variant="therapeutic">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="secondary">{group.type}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{group.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{group.members} members</span>
                      </div>
                      <Button variant="therapeutic" className="w-full">Join Group</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Community Events
                </CardTitle>
                <CardDescription>Join virtual and in-person wellness events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Event Calendar</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover workshops, webinars, and community gatherings focused on mental wellness
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="therapeutic">View Calendar</Button>
                    <Button variant="outline">Create Event</Button>
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

export default Community;