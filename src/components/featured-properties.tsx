"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const properties = [
  {
    id: 1,
    title: "Modern Waterfront Villa",
    location: "Miami Beach, Florida",
    price: "$2,450,000",
    type: "Villa",
    beds: 5,
    baths: 4,
    area: "4,200 sq ft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
    isNew: true,
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, New York",
    price: "$4,850,000",
    type: "Penthouse",
    beds: 4,
    baths: 3,
    area: "3,800 sq ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    featured: false,
    isNew: false,
  },
  {
    id: 3,
    title: "Contemporary Hillside Estate",
    location: "Beverly Hills, California",
    price: "$6,200,000",
    type: "Estate",
    beds: 6,
    baths: 5,
    area: "6,500 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: true,
    isNew: true,
  },
  {
    id: 4,
    title: "Urban Loft Apartment",
    location: "Chicago, Illinois",
    price: "$1,250,000",
    type: "Apartment",
    beds: 3,
    baths: 2,
    area: "2,100 sq ft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    featured: false,
    isNew: false,
  },
  {
    id: 5,
    title: "Seaside Mediterranean Villa",
    location: "San Diego, California",
    price: "$3,750,000",
    type: "Villa",
    beds: 4,
    baths: 3,
    area: "3,400 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    featured: false,
    isNew: true,
  },
  {
    id: 6,
    title: "Downtown Luxury Condo",
    location: "Austin, Texas",
    price: "$1,850,000",
    type: "Condo",
    beds: 3,
    baths: 2,
    area: "2,400 sq ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: false,
    isNew: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FeaturedProperties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="properties"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-stone-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            Featured Properties
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Exclusive Listings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties, each offering
            unique features and exceptional value in prime locations.
          </p>
        </motion.div>

        {/* Property Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              className="group relative"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 border border-border/50 hover:border-gold/30">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                      <Badge className="bg-gold text-gold-foreground border-0">
                        Featured
                      </Badge>
                    )}
                    {property.isNew && (
                      <Badge className="bg-emerald-500 text-white border-0">
                        New
                      </Badge>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black"
                  >
                    <Heart className="w-5 h-5 text-foreground" />
                  </motion.button>
                  
                  {/* Type Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-xs font-medium text-foreground">
                      {property.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Price */}
                  <div className="text-2xl font-serif font-semibold text-foreground mb-2">
                    {property.price}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                    {property.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <BedDouble className="w-4 h-4" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Bath className="w-4 h-4" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Maximize className="w-4 h-4" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-2 hover:bg-gold hover:text-gold-foreground hover:border-gold transition-all duration-300"
            >
              View All Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
