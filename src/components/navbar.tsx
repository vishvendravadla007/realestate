"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Building2, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Properties", href: "#properties" },
  { name: "Locations", href: "#locations" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check auth status
    const supabase = createClient();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  // Prevent hydration mismatch by rendering minimal content during SSR
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl" />
              <span className="font-serif text-xl font-semibold">
                PrimeNest<span className="text-gold">.</span>
              </span>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold/25 group-hover:shadow-gold/40 transition-shadow duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              PrimeNest
              <span className="text-gold ml-1">.</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-gold" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth Buttons or User Menu */}
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    {/* Dashboard Link */}
                    <Link href="/dashboard" className="hidden sm:flex">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          className="gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Button>
                      </motion.div>
                    </Link>

                    {/* User Avatar */}
                    <Link href="/dashboard">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-gold/20 hover:ring-gold/50 transition-all">
                          <AvatarFallback className="bg-gold/10 text-gold font-medium text-sm">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Sign In */}
                    <Link href="/sign-in" className="hidden sm:block">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Sign In
                        </Button>
                      </motion.div>
                    </Link>

                    {/* Sign Up */}
                    <Link href="/sign-up">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="bg-gold hover:bg-gold/90 text-gold-foreground font-medium px-4 shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
                        >
                          <User className="w-4 h-4 mr-2 sm:mr-0 lg:mr-2" />
                          <span className="hidden lg:inline">Get Started</span>
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-xl font-semibold">
                      PrimeNest<span className="text-gold">.</span>
                    </span>
                  </div>
                  
                  {/* Mobile Auth Section */}
                  {!loading && !user && (
                    <div className="flex gap-2 mb-6">
                      <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gold hover:bg-gold/90">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* User info if logged in */}
                  {!loading && user && (
                    <div className="flex items-center gap-3 mb-6 p-4 bg-secondary/50 rounded-xl">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gold/10 text-gold font-medium">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{userName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="px-4 py-3 text-left text-lg font-medium text-foreground hover:text-gold hover:bg-secondary rounded-xl transition-colors duration-300"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.name}
                      </motion.button>
                    ))}
                    
                    {!loading && user && (
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.button
                          className="w-full px-4 py-3 text-left text-lg font-medium text-gold hover:bg-gold/10 rounded-xl transition-colors duration-300 flex items-center gap-2"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: navLinks.length * 0.1 }}
                        >
                          <LayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </motion.button>
                      </Link>
                    )}
                  </div>

                  <div className="mt-auto pb-8">
                    <Button
                      onClick={() => scrollToSection("#contact")}
                      className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-medium py-6 shadow-lg shadow-gold/25"
                    >
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
