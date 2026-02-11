'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Building2, 
  LogOut, 
  Home, 
  Heart, 
  MessageSquare, 
  Settings, 
  User,
  Bell,
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface DashboardClientProps {
  user: SupabaseUser
}

const savedProperties = [
  {
    id: 1,
    title: "Modern Waterfront Villa",
    location: "Miami Beach, Florida",
    price: "$2,450,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
    beds: 5,
    baths: 4,
    area: "4,200 sq ft",
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, New York",
    price: "$4,850,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    beds: 4,
    baths: 3,
    area: "3,800 sq ft",
  },
]

const recentActivity = [
  { id: 1, type: 'view', message: 'Viewed Modern Waterfront Villa', time: '2 hours ago' },
  { id: 2, type: 'save', message: 'Saved Luxury Penthouse Suite', time: '5 hours ago' },
  { id: 3, type: 'message', message: 'Sent inquiry about Downtown Condo', time: '1 day ago' },
]

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30 dark:from-stone-950 dark:via-stone-900 dark:to-amber-950/20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-xl font-semibold">
                PrimeNest<span className="text-gold">.</span>
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/50 border-0 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gold/10 text-gold font-medium">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/10 text-gold font-medium"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Saved Properties
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Messages
                  <span className="ml-auto bg-gold text-gold-foreground text-xs px-2 py-0.5 rounded-full">
                    3
                  </span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
                <hr className="my-2 border-border" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
            >
              <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                Welcome back, {userName}!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your property search.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-2xl font-semibold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Saved Properties</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-2xl font-semibold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Active Inquiries</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Scheduled Visits</p>
                </div>
              </div>
            </motion.div>

            {/* Saved Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-semibold">Saved Properties</h2>
                <Link href="#" className="text-sm text-gold hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-gold fill-gold" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-foreground mb-1">{property.title}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gold">{property.price}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BedDouble className="w-3 h-3" /> {property.beds}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-3 h-3" /> {property.baths}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <h2 className="font-serif text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'view' ? 'bg-blue-500/10 text-blue-500' :
                      activity.type === 'save' ? 'bg-gold/10 text-gold' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {activity.type === 'view' ? <Search className="w-5 h-5" /> :
                       activity.type === 'save' ? <Heart className="w-5 h-5" /> :
                       <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
