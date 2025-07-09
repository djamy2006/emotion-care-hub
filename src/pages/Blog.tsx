import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Heart, 
  Brain, 
  Lightbulb,
  Play,
  Download,
  Share,
  Bookmark
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");

  const featuredArticles = [
    {
      id: 1,
      title: "Understanding Anxiety: A Comprehensive Guide",
      excerpt: "Learn about the different types of anxiety disorders, their symptoms, and evidence-based treatment approaches.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-20",
      readTime: "8 min read",
      category: "Anxiety",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "10 Daily Practices for Better Mental Health",
      excerpt: "Simple, science-backed strategies you can implement today to improve your mental wellbeing.",
      author: "Dr. Michael Brown",
      date: "2024-01-18",
      readTime: "6 min read",
      category: "Wellness",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 3,
      title: "The Science of Sleep and Mental Health",
      excerpt: "Discover how sleep quality affects your mental health and practical tips for better rest.",
      author: "Dr. Emily Davis",
      date: "2024-01-15",
      readTime: "10 min read",
      category: "Sleep",
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const resources = [
    {
      type: "guide",
      title: "Mindfulness Meditation for Beginners",
      description: "Step-by-step guide to starting a meditation practice",
      downloadSize: "2.3 MB",
      format: "PDF"
    },
    {
      type: "worksheet",
      title: "Anxiety Tracking Worksheet",
      description: "Monitor your anxiety patterns and triggers",
      downloadSize: "1.1 MB",
      format: "PDF"
    },
    {
      type: "audio",
      title: "Guided Relaxation Sessions",
      description: "5 different audio tracks for stress relief",
      downloadSize: "45 MB",
      format: "MP3"
    },
    {
      type: "video",
      title: "Breathing Exercises for Panic Attacks",
      description: "Quick techniques to manage panic symptoms",
      downloadSize: "120 MB",
      format: "MP4"
    }
  ];

  const categories = [
    { name: "All", count: 156, color: "bg-primary" },
    { name: "Anxiety", count: 34, color: "bg-accent-warm" },
    { name: "Depression", count: 28, color: "bg-secondary-accent" },
    { name: "Wellness", count: 45, color: "bg-primary" },
    { name: "Sleep", count: 23, color: "bg-accent-warm" },
    { name: "Stress", count: 26, color: "bg-secondary-accent" }
  ];

  const recentArticles = [
    {
      id: 4,
      title: "Managing Work-Life Balance in Remote Settings",
      excerpt: "Strategies for maintaining mental health while working from home.",
      author: "Dr. Alex Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Stress"
    },
    {
      id: 5,
      title: "Building Resilience Through Difficult Times",
      excerpt: "How to develop emotional resilience and bounce back from challenges.",
      author: "Dr. Lisa Martinez",
      date: "2024-01-10",
      readTime: "9 min read",
      category: "Wellness"
    },
    {
      id: 6,
      title: "The Connection Between Exercise and Mental Health",
      excerpt: "Scientific evidence on how physical activity improves mental wellbeing.",
      author: "Dr. James Wilson",
      date: "2024-01-08",
      readTime: "11 min read",
      category: "Wellness"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resources & Blog</h1>
            <p className="text-muted-foreground">Evidence-based insights and practical tools for mental wellness</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles, guides, and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            {/* Featured Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Featured Articles
                </CardTitle>
                <CardDescription>Expert insights on mental health and wellness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.filter(article => article.featured).map((article) => (
                    <div key={article.id} className="group cursor-pointer">
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <User className="h-3 w-3" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{article.date}</span>
                            </div>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Latest insights from our mental health experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <h3 className="font-semibold hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>by {article.author}</span>
                          <div className="flex items-center space-x-4">
                            <span>{article.date}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Downloadable Resources
                </CardTitle>
                <CardDescription>Practical tools and guides for your mental health journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-medium transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {resource.type === "guide" && <BookOpen className="h-5 w-5 text-primary" />}
                            {resource.type === "worksheet" && <Lightbulb className="h-5 w-5 text-accent-warm" />}
                            {resource.type === "audio" && <Play className="h-5 w-5 text-secondary-accent" />}
                            {resource.type === "video" && <Play className="h-5 w-5 text-destructive" />}
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                          </div>
                          <Badge variant="outline">{resource.format}</Badge>
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{resource.downloadSize}</span>
                          <Button variant="therapeutic" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
                <CardDescription>Explore content organized by mental health topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category, index) => (
                    <Card key={index} className="hover:shadow-medium transition-all duration-300 cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                            <div>
                              <h3 className="font-semibold">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">{category.count} articles</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {category.name === "Anxiety" && <Brain className="h-5 w-5 text-muted-foreground" />}
                            {category.name === "Depression" && <Heart className="h-5 w-5 text-muted-foreground" />}
                            {category.name === "Wellness" && <Lightbulb className="h-5 w-5 text-muted-foreground" />}
                            {category.name === "Sleep" && <Calendar className="h-5 w-5 text-muted-foreground" />}
                            {category.name === "Stress" && <Brain className="h-5 w-5 text-muted-foreground" />}
                            {category.name === "All" && <BookOpen className="h-5 w-5 text-muted-foreground" />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Blog;