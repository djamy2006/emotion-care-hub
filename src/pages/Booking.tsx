import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { 
  ChevronLeft, 
  Star, 
  Video, 
  Phone, 
  MessageSquare, 
  MapPin,
  Clock,
  Award,
  Calendar as CalendarIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AIChat } from "@/components/AIChat";

const providers = [
  // Psychologists
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specialization: "Anxiety & Depression",
    experience: "8 years",
    rating: 4.9,
    reviews: 127,
    price: 120,
    avatar: "/placeholder.svg",
    availability: ["Video", "Audio", "Chat"],
    bio: "Specialized in cognitive behavioral therapy and mindfulness-based interventions.",
    qualifications: ["PhD Psychology", "Licensed Clinical Psychologist", "CBT Certified"],
    category: "psychologist"
  },
  {
    id: 2,
    name: "Dr. Emma Williams",
    title: "Child Psychologist",
    specialization: "Child & Adolescent Therapy",
    experience: "6 years",
    rating: 4.8,
    reviews: 94,
    price: 110,
    avatar: "/placeholder.svg",
    availability: ["Video", "In-Person"],
    bio: "Expert in child development and family therapy approaches.",
    qualifications: ["PhD Developmental Psychology", "Child Therapy Specialist"],
    category: "psychologist"
  },
  
  // Psychiatrists
  {
    id: 3,
    name: "Dr. Michael Chen",
    title: "Psychiatrist",
    specialization: "ADHD & Mood Disorders",
    experience: "12 years",
    rating: 4.8,
    reviews: 89,
    price: 180,
    avatar: "/placeholder.svg",
    availability: ["Video", "Audio", "In-Person"],
    bio: "Expert in medication management and comprehensive psychiatric care.",
    qualifications: ["MD Psychiatry", "Board Certified", "ADHD Specialist"],
    category: "psychiatrist"
  },
  {
    id: 4,
    name: "Dr. Priya Sharma",
    title: "Psychiatrist",
    specialization: "Bipolar & Schizophrenia",
    experience: "15 years",
    rating: 4.9,
    reviews: 156,
    price: 200,
    avatar: "/placeholder.svg",
    availability: ["Video", "In-Person"],
    bio: "Specialized in severe mental illness and recovery-oriented care.",
    qualifications: ["MD Psychiatry", "Fellowship in Psychotic Disorders"],
    category: "psychiatrist"
  },

  // NLP Practitioners
  {
    id: 5,
    name: "Lisa Rodriguez",
    title: "NLP Practitioner",
    specialization: "Personal Growth & Transformation",
    experience: "6 years",
    rating: 4.7,
    reviews: 156,
    price: 85,
    avatar: "/placeholder.svg",
    availability: ["Video", "Chat", "In-Person"],
    bio: "Combining NLP techniques with modern coaching methodologies.",
    qualifications: ["Certified NLP Practitioner", "ICF Certified Coach", "Mindfulness Teacher"],
    category: "nlp"
  },
  {
    id: 6,
    name: "Mark Thompson",
    title: "Master NLP Practitioner",
    specialization: "Behavioral Change & Habits",
    experience: "10 years",
    rating: 4.6,
    reviews: 203,
    price: 95,
    avatar: "/placeholder.svg",
    availability: ["Video", "Audio", "Chat"],
    bio: "Expert in rapid behavioral change and overcoming limiting beliefs.",
    qualifications: ["Master NLP Practitioner", "Timeline Therapy Certified"],
    category: "nlp"
  },

  // Yoga Experts
  {
    id: 7,
    name: "Anjali Patel",
    title: "Yoga Expert & Mindfulness Teacher",
    specialization: "Therapeutic Yoga & Meditation",
    experience: "8 years",
    rating: 4.9,
    reviews: 234,
    price: 65,
    avatar: "/placeholder.svg",
    availability: ["Video", "In-Person"],
    bio: "Combining traditional yoga with modern therapeutic approaches for mental wellness.",
    qualifications: ["Yoga Alliance RYT-500", "Mindfulness-Based Stress Reduction Certified"],
    category: "yoga"
  },

  // Dementia Care Specialists
  {
    id: 8,
    name: "Dr. Robert Anderson",
    title: "Dementia Care Specialist",
    specialization: "Alzheimer's & Memory Care",
    experience: "14 years",
    rating: 4.8,
    reviews: 87,
    price: 150,
    avatar: "/placeholder.svg",
    availability: ["Video", "In-Person"],
    bio: "Specialized in dementia care, family support, and cognitive rehabilitation.",
    qualifications: ["Geriatric Medicine Certified", "Dementia Care Specialist"],
    category: "dementia"
  },

  // ADHD Coaches
  {
    id: 9,
    name: "Jennifer Kim",
    title: "ADHD Coach",
    specialization: "ADHD Life Skills & Organization",
    experience: "5 years",
    rating: 4.7,
    reviews: 128,
    price: 90,
    avatar: "/placeholder.svg",
    availability: ["Video", "Audio", "Chat"],
    bio: "Helping individuals with ADHD develop practical life skills and coping strategies.",
    qualifications: ["Certified ADHD Coach", "Executive Function Specialist"],
    category: "adhd"
  },

  // Gym Trainers
  {
    id: 10,
    name: "Alex Martinez",
    title: "Mental Health Fitness Trainer",
    specialization: "Exercise for Mental Wellness",
    experience: "7 years",
    rating: 4.6,
    reviews: 167,
    price: 75,
    avatar: "/placeholder.svg",
    availability: ["Video", "In-Person"],
    bio: "Personal trainer specializing in exercise programs for mental health improvement.",
    qualifications: ["Certified Personal Trainer", "Mental Health First Aid"],
    category: "fitness"
  },

  // Dieticians/Nutritionists
  {
    id: 11,
    name: "Dr. Maya Singh",
    title: "Clinical Nutritionist",
    specialization: "Nutrition for Mental Health",
    experience: "9 years",
    rating: 4.8,
    reviews: 145,
    price: 100,
    avatar: "/placeholder.svg",
    availability: ["Video", "Audio", "Chat"],
    bio: "Registered dietitian focusing on the gut-brain connection and nutritional psychiatry.",
    qualifications: ["Registered Dietitian", "Nutritional Psychiatry Certified"],
    category: "nutrition"
  }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", 
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

const Booking = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleProviderSelect = (providerId: number) => {
    setSelectedProvider(providerId);
    setCurrentStep(2);
  };

  const handleBooking = () => {
    // Here we would integrate with backend/Supabase
    alert("Booking functionality requires backend integration. Please connect Supabase first.");
  };

  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  const renderProviderCard = (provider: typeof providers[0]) => (
    <Card key={provider.id} className="hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{provider.name}</h3>
              <p className="text-primary font-medium">{provider.title}</p>
              <p className="text-sm text-muted-foreground">{provider.specialization}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {provider.experience}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                {provider.rating} ({provider.reviews} reviews)
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {provider.availability.map((mode) => (
                <Badge key={mode} variant="secondary" className="text-xs">
                  {mode === "Video" && <Video className="h-3 w-3 mr-1" />}
                  {mode === "Audio" && <Phone className="h-3 w-3 mr-1" />}
                  {mode === "Chat" && <MessageSquare className="h-3 w-3 mr-1" />}
                  {mode === "In-Person" && <MapPin className="h-3 w-3 mr-1" />}
                  {mode}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-primary">${provider.price}/session</div>
              <Button 
                variant="therapeutic" 
                onClick={() => handleProviderSelect(provider.id)}
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (currentStep === 2 && selectedProviderData) {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(1)}
              className="mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Providers
            </Button>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Provider Info */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedProviderData.avatar} alt={selectedProviderData.name} />
                      <AvatarFallback>{selectedProviderData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedProviderData.name}</h3>
                      <p className="text-primary">{selectedProviderData.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedProviderData.specialization}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Select Session Type:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProviderData.availability.map((mode) => (
                        <Button
                          key={mode}
                          variant={selectedMode === mode ? "therapeutic" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedMode(mode)}
                        >
                          {mode === "Video" && <Video className="h-4 w-4 mr-2" />}
                          {mode === "Audio" && <Phone className="h-4 w-4 mr-2" />}
                          {mode === "Chat" && <MessageSquare className="h-4 w-4 mr-2" />}
                          {mode === "In-Person" && <MapPin className="h-4 w-4 mr-2" />}
                          {mode}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Session Fee:</span>
                      <span className="text-xl font-bold text-primary">${selectedProviderData.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scheduling */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Choose Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Select Date:</h4>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Available Times:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "therapeutic" : "outline"}
                          className="justify-center"
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full"
                    disabled={!selectedDate || !selectedTime || !selectedMode}
                    onClick={handleBooking}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
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
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-4">Book a Session</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with qualified mental health professionals
          </p>
        </div>

        <Tabs defaultValue="all" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-8 h-auto p-1">
            <TabsTrigger value="all" className="text-xs px-2 py-1">All</TabsTrigger>
            <TabsTrigger value="psychologist" className="text-xs px-2 py-1">Psychology</TabsTrigger>
            <TabsTrigger value="psychiatrist" className="text-xs px-2 py-1">Psychiatry</TabsTrigger>
            <TabsTrigger value="nlp" className="text-xs px-2 py-1">NLP</TabsTrigger>
            <TabsTrigger value="yoga" className="text-xs px-2 py-1">Yoga</TabsTrigger>
            <TabsTrigger value="dementia" className="text-xs px-2 py-1">Dementia</TabsTrigger>
            <TabsTrigger value="adhd" className="text-xs px-2 py-1">ADHD</TabsTrigger>
            <TabsTrigger value="fitness" className="text-xs px-2 py-1">Fitness</TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs px-2 py-1">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {providers.map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="psychologist" className="space-y-6">
            {providers.filter(p => p.category === "psychologist").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="psychiatrist" className="space-y-6">
            {providers.filter(p => p.category === "psychiatrist").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="nlp" className="space-y-6">
            {providers.filter(p => p.category === "nlp").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="yoga" className="space-y-6">
            {providers.filter(p => p.category === "yoga").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="dementia" className="space-y-6">
            {providers.filter(p => p.category === "dementia").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="adhd" className="space-y-6">
            {providers.filter(p => p.category === "adhd").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="fitness" className="space-y-6">
            {providers.filter(p => p.category === "fitness").map(renderProviderCard)}
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            {providers.filter(p => p.category === "nutrition").map(renderProviderCard)}
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Booking;