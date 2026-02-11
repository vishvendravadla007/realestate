"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "PrimeNest made our dream of owning a home a reality. Their team was incredibly supportive throughout the entire process, from finding the perfect property to closing the deal. Highly recommend!",
    location: "New York",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "As an investor, I need a real estate partner who understands the market. PrimeNest exceeded all my expectations with their market insights and professional service. My portfolio has grown significantly.",
    location: "Los Angeles",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "First-time Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "Being a first-time buyer was intimidating, but the PrimeNest team guided me every step of the way. They answered all my questions and made the process seamless. I couldn't be happier with my new home!",
    location: "Miami",
  },
  {
    id: 4,
    name: "Michael Roberts",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    text: "We needed a commercial space for our expanding business, and PrimeNest delivered beyond expectations. They understood our requirements perfectly and found us an ideal location within our budget.",
    location: "Chicago",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-stone-100/50 to-transparent dark:from-stone-900/50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients who
            found their perfect properties with PrimeNest.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/30">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Main Card */}
          <div className="relative bg-card rounded-3xl p-8 sm:p-12 border border-border/50 shadow-xl overflow-hidden min-h-[400px]">
            {/* Background Quote */}
            <div className="absolute top-8 right-8 opacity-5">
              <Quote className="w-32 h-32" />
            </div>

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 font-medium max-w-2xl">
                  "{currentTestimonial.text}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 ring-4 ring-gold/20">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-gold text-sm mt-1">
                    {currentTestimonial.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gold w-8"
                    : "bg-gold/30 hover:bg-gold/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
