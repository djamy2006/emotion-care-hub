import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import heroVideo1 from "@/assets/hero-video-1.jpg";
import heroVideo2 from "@/assets/hero-video-2.jpg";
import heroVideo3 from "@/assets/hero-video-3.jpg";

const heroImages = [
  {
    src: heroVideo1,
    alt: "Supportive therapy session",
    title: "Professional Support",
  },
  {
    src: heroVideo2,
    alt: "Peaceful meditation",
    title: "Find Your Peace",
  },
  {
    src: heroVideo3,
    alt: "Video consultation",
    title: "Connect Anywhere",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
        ))}
      </div>

      {/* Video Controls */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          How are you feeling{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
            today?
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-in max-w-2xl mx-auto">
          Take control of your mental wellness journey with professional support, 
          AI-powered insights, and a caring community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button variant="hero" size="xl" className="text-lg">
            Take a Free Assessment
          </Button>
          <Button variant="warm" size="xl" className="text-lg">
            Book a Session
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-100 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Licensed Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>24/7 AI Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};