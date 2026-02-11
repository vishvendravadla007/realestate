"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "New York",
    state: "New York",
    properties: 450,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  },
  {
    id: 2,
    name: "Los Angeles",
    state: "California",
    properties: 320,
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80",
  },
  {
    id: 3,
    name: "Miami",
    state: "Florida",
    properties: 280,
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&q=80",
  },
  {
    id: 4,
    name: "Chicago",
    state: "Illinois",
    properties: 195,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
  },
  {
    id: 5,
    name: "San Francisco",
    state: "California",
    properties: 165,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  },
  {
    id: 6,
    name: "Austin",
    state: "Texas",
    properties: 210,
    image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="locations"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            Popular Locations
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Explore Top Cities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium properties in the most sought-after locations across the
            country. Find your perfect neighborhood.
          </p>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                {/* Image */}
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Location Icon */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="text-white/80 text-sm">{location.state}</span>
                    </div>
                    
                    {/* City Name */}
                    <h3 className="text-2xl font-serif font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-300">
                      {location.name}
                    </h3>
                    
                    {/* Properties Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">
                        {location.properties} Properties
                      </span>
                      
                      {/* Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-gold font-medium hover:underline underline-offset-4"
          >
            View All Locations
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
