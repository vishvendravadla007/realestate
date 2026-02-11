"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ShieldCheck, Wallet, HeadphonesIcon, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Trusted by 10,000+",
    subtitle: "Happy Customers",
    description:
      "We've helped thousands of families find their dream homes. Our commitment to excellence has earned us the trust of clients worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    subtitle: "100% Authentic",
    description:
      "Every property on our platform undergoes rigorous verification. We ensure all listings are accurate, legal, and ready for transaction.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    subtitle: "No Hidden Fees",
    description:
      "We believe in complete transparency. Our pricing structure is clear from the start, with no surprise costs or hidden charges.",
  },
  {
    icon: HeadphonesIcon,
    title: "End-to-End Support",
    subtitle: "24/7 Assistance",
    description:
      "From initial search to final paperwork, our dedicated team guides you through every step of your property journey.",
  },
  {
    icon: Award,
    title: "Award Winning",
    subtitle: "Industry Recognition",
    description:
      "Recognized as a leading real estate agency with multiple industry awards for customer satisfaction and service excellence.",
  },
  {
    icon: Clock,
    title: "Fast Process",
    subtitle: "Quick Closings",
    description:
      "Our streamlined processes and experienced team ensure quick and efficient property transactions, saving you valuable time.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-stone-100/50 to-transparent dark:from-stone-900/50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gold/5 via-amber-500/5 to-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            The PrimeNest Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine industry expertise with personalized service to deliver
            an exceptional real estate experience that exceeds expectations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative"
            >
              <div className="h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-amber-500/10 flex items-center justify-center group-hover:from-gold/30 group-hover:to-amber-500/20 transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-gold" />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-all duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-gold text-sm font-medium mb-4">
                  {feature.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
