"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const element = document.querySelector("#properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30 dark:from-stone-950 dark:via-stone-900 dark:to-amber-950/20" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-gold/20 to-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-stone-400/20 to-stone-200/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Premium Real Estate Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-[1.1] mb-6"
          >
            Find Your
            <br />
            <span className="relative inline-block">
              Dream Property
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gold/20 -rotate-1 origin-left"
              />
            </span>
            <span className="text-gold">.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Premium apartments, villas, and plots in top locations.
            <br className="hidden sm:block" />
            Let us help you find your perfect home.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/5 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="san-francisco">San Francisco</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">
                  Property Type
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Budget */}
              <div className="relative">
                <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">
                  Budget Range
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl text-foreground">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500k">Under $500k</SelectItem>
                      <SelectItem value="1m">$500k - $1M</SelectItem>
                      <SelectItem value="2m">$1M - $2M</SelectItem>
                      <SelectItem value="5m">$2M - $5M</SelectItem>
                      <SelectItem value="5m+">$5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    onClick={handleSearch}
                    className="w-full h-12 bg-gold hover:bg-gold/90 text-gold-foreground font-medium rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: "10k+", label: "Happy Customers" },
              { value: "2,500+", label: "Properties Listed" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
