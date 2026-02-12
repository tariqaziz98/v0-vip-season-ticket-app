export const user = {
  name: "Michael Thompson",
  memberSince: 2018,
  tenure: 7,
  tier: "Maize",
  points: 1250,
  nextReward: "Free Parking",
  pointsToNext: 300,
  section: "27",
  row: "44",
  seats: "12-13",
  badges: ["Ironman", "Early Bird", "Tailgate King"],
}

export const gameInfo = {
  opponent: "Ohio State Buckeyes",
  date: "Saturday, Nov 29",
  time: "3:30 PM ET",
  kickoffIn: { hours: 4, minutes: 22, seconds: 15 },
  venue: "Michigan Stadium",
  attendance: "Expected 112,000+",
  weather: "54°F, Partly Cloudy",
  tvNetwork: "FOX",
}

export interface ParkingLot {
  id: string
  name: string
  available: number
  total: number
  distance: string
  distanceMi: number
  price: number
  sthPrice: number
  gate: string
  bestFor: string
  status: "available" | "filling" | "full"
  updatedAgo: string
}

export const parkingLots: ParkingLot[] = [
  {
    id: "m3",
    name: "Lot M3",
    available: 45,
    total: 200,
    distance: "0.3 mi",
    distanceMi: 0.3,
    price: 30,
    sthPrice: 25,
    gate: "Gate 12",
    bestFor: "Arrivals 1:30-3:00 PM",
    status: "available",
    updatedAgo: "30 sec ago",
  },
  {
    id: "n12",
    name: "Lot N12",
    available: 12,
    total: 150,
    distance: "0.2 mi",
    distanceMi: 0.2,
    price: 35,
    sthPrice: 30,
    gate: "Gate 8",
    bestFor: "Arrivals 12:00-2:00 PM",
    status: "filling",
    updatedAgo: "15 sec ago",
  },
  {
    id: "pioneer",
    name: "Pioneer Lot",
    available: 87,
    total: 300,
    distance: "0.5 mi",
    distanceMi: 0.5,
    price: 25,
    sthPrice: 20,
    gate: "Gate 3",
    bestFor: "Arrivals 2:00-3:30 PM",
    status: "available",
    updatedAgo: "45 sec ago",
  },
  {
    id: "maize",
    name: "Maize Garage",
    available: 5,
    total: 120,
    distance: "0.4 mi",
    distanceMi: 0.4,
    price: 40,
    sthPrice: 35,
    gate: "Gate 1",
    bestFor: "Premium access",
    status: "filling",
    updatedAgo: "10 sec ago",
  },
  {
    id: "state",
    name: "State Street",
    available: 150,
    total: 500,
    distance: "0.8 mi",
    distanceMi: 0.8,
    price: 15,
    sthPrice: 15,
    gate: "Gate 6",
    bestFor: "Budget-friendly option",
    status: "available",
    updatedAgo: "1 min ago",
  },
  {
    id: "blue",
    name: "Blue Lot",
    available: 0,
    total: 100,
    distance: "0.1 mi",
    distanceMi: 0.1,
    price: 50,
    sthPrice: 45,
    gate: "Gate 12",
    bestFor: "Closest to stadium",
    status: "full",
    updatedAgo: "5 sec ago",
  },
]

export interface MenuItem {
  id: string
  name: string
  category: "featured" | "food" | "drinks" | "snacks"
  price: number
  sthPrice: number
  image: string
  waitTime: string
  popular?: boolean
  description: string
}

export const menuItems: MenuItem[] = [
  {
    id: "combo1",
    name: "STH Game Day Combo",
    category: "featured",
    price: 18,
    sthPrice: 14.4,
    image: "/concessions.jpg",
    waitTime: "8 min",
    popular: true,
    description: "Hot dog, fries & draft beer",
  },
  {
    id: "hotdog",
    name: "Stadium Hot Dog",
    category: "food",
    price: 9,
    sthPrice: 7.2,
    image: "/concessions.jpg",
    waitTime: "5 min",
    description: "Classic all-beef hot dog",
  },
  {
    id: "nachos",
    name: "Loaded Nachos",
    category: "food",
    price: 12,
    sthPrice: 9.6,
    image: "/concessions.jpg",
    waitTime: "7 min",
    description: "Tortilla chips with cheese & jalapenos",
  },
  {
    id: "burger",
    name: "Big House Burger",
    category: "food",
    price: 14,
    sthPrice: 11.2,
    image: "/concessions.jpg",
    waitTime: "10 min",
    description: "1/3 lb burger with all the fixings",
  },
  {
    id: "beer",
    name: "Draft Beer",
    category: "drinks",
    price: 10,
    sthPrice: 8,
    image: "/concessions.jpg",
    waitTime: "3 min",
    description: "Michigan craft lager, 16oz",
  },
  {
    id: "soda",
    name: "Fountain Soda",
    category: "drinks",
    price: 5,
    sthPrice: 4,
    image: "/concessions.jpg",
    waitTime: "2 min",
    description: "Coca-Cola products, free refills",
  },
  {
    id: "pretzel",
    name: "Soft Pretzel",
    category: "snacks",
    price: 7,
    sthPrice: 5.6,
    image: "/concessions.jpg",
    waitTime: "4 min",
    description: "Warm salted pretzel with cheese dip",
  },
  {
    id: "popcorn",
    name: "Kettle Corn",
    category: "snacks",
    price: 6,
    sthPrice: 4.8,
    image: "/concessions.jpg",
    waitTime: "2 min",
    description: "Fresh-popped kettle corn, large",
  },
]

export interface FieldAccessSlot {
  id: string
  title: string
  date: string
  time: string
  spotsTotal: number
  spotsRemaining: number
  rsvpCount: number
  location: string
  description: string
  requirements: string[]
}

export const fieldAccessSlots: FieldAccessSlot[] = [
  {
    id: "warmup1",
    title: "Pregame Sideline Experience",
    date: "Saturday, Nov 29",
    time: "11:00 - 11:30 AM",
    spotsTotal: 100,
    spotsRemaining: 23,
    rsvpCount: 77,
    location: "Gate 1 Entry",
    description:
      "Watch players warm up from the sideline. Get an exclusive field-level view of pregame preparations.",
    requirements: ["Active season ticket holder", "Must be 18+", "Arrive by 10:50 AM"],
  },
  {
    id: "tunnel1",
    title: "Tunnel Walk Viewing",
    date: "Saturday, Nov 29",
    time: "2:45 - 3:15 PM",
    spotsTotal: 50,
    spotsRemaining: 8,
    rsvpCount: 42,
    location: "Tunnel Entrance",
    description:
      "Stand at the tunnel entrance as the team runs out onto the field. The most electrifying moment in college football.",
    requirements: ["Active season ticket holder", "Must be 18+", "Arrive by 2:30 PM"],
  },
]
