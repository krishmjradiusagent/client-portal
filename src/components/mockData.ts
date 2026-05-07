export type RouteKey =
  | "search"
  | "my-searches"
  | "home-value"
  | "interested"
  | "messages"
  | "not-interested"
  | "profile"
  | "settings"
  | "logout"
  | "recently-viewed";

export type PropertyStatus = "search" | "interested" | "notInterested";

export interface CompProperty {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  meta: string;
  image: string;
  markerTop: string;
  markerLeft: string;
}

export type Property = {
  id: string;
  address: string;
  area: string;
  city: string;
  state: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot: string;
  yearBuilt: number;
  listedDate: string;
  matchScore: number;
  isNew?: boolean;
  hasPriceCut?: boolean;
  mlsStatus: string;
  status: PropertyStatus;
  type: string;
  image: string;
  images: string[];
  markerTop: string;
  markerLeft: string;
  description: string;
  tags: string[];
};

export type SavedSearch = {
  id: string;
  name: string;
  location: string;
  criteria: string; // Serialized active filters
  frequency: string;
  updatedAt: string;
  propertyIds: string[];
  priceMin?: string;
  priceMax?: string;
  emailAlerts?: boolean;
};

export type Message = {
  id: string;
  content: string;
  time: string;
  isIncoming: boolean;
  status?: "Delivered" | "Sent" | "Read";
};

export type HomeValueListing = {
  id: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  imageUrl?: string;
  estimate?: number;
  price?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  status?: string;
  lastUpdated?: string;
};

export const locationSuggestions = [
  "All areas",
  "Downtown Austin",
  "Westlake",
  "Zilker",
  "Mueller",
  "Clarksville",
  "East Austin",
  "South Congress"
];

export const priceOptions = [
  { value: "0", label: "No min" },
  { value: "300000", label: "$300K" },
  { value: "400000", label: "$400K" },
  { value: "500000", label: "$500K" },
  { value: "650000", label: "$650K" },
  { value: "800000", label: "$800K" },
  { value: "1000000", label: "$1M" }
];

export const maxPriceOptions = [
  { value: "1000000", label: "$1M" },
  { value: "1250000", label: "$1.25M" },
  { value: "1500000", label: "$1.5M" },
  { value: "1750000", label: "$1.75M" },
  { value: "2000000", label: "$2M" },
  { value: "3000000", label: "$3M+" }
];

export const sortOptions = [
  { value: "default", label: "Recent Status/Price Changes" },
  { value: "newest", label: "Newest On Site" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" }
];

export const alertFrequencies = [
  { value: "instant", label: "Instant" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" }
];

export const mapLayers = [
  { value: "standard", label: "Standard" },
  { value: "satellite", label: "Satellite" },
  { value: "traffic", label: "Traffic" },
  { value: "schools", label: "Schools" }
];

export const moreFilterDefaults = {
  propertyType: "Any",
  beds: "Any",
  baths: "Any",
  yearBuilt: "Any",
  hoa: "Any",
  openHouse: "Any",
  lot: "Any"
};

export const propertyTypeOptions = ["Any", "House", "Condo", "Townhome", "Duplex"];
export const bedOptions = ["Any", "2+", "3+", "4+"];
export const bathOptions = ["Any", "2+", "3+"];
export const yearOptions = ["Any", "2015+", "2020+", "New construction"];
export const hoaOptions = ["Any", "No HOA", "Under $300", "$300+"];
export const openHouseOptions = ["Any", "This weekend", "Open now"];
export const lotOptions = ["Any", "Small lot", "Medium lot", "Large lot"];

export const properties: Property[] = [
  {
    id: "prop-1",
    address: "2101 S Congress Ave",
    area: "South Congress",
    city: "Austin",
    state: "TX",
    price: 895000,
    beds: 3,
    baths: 2,
    sqft: 1824,
    lot: "0.14 ac",
    yearBuilt: 2018,
    listedDate: "2024-05-01",
    matchScore: 96,
    isNew: true,
    mlsStatus: "ACT",
    status: "search",
    type: "Townhome",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "38%",
    markerLeft: "52%",
    description: "Bright corner townhome with walkable retail, hill views, and a private terrace.",
    tags: ["Walkable", "Terrace", "EV ready"]
  },
  {
    id: "prop-2",
    address: "4208 Hyde Park Rd",
    area: "Hyde Park",
    city: "Austin",
    state: "TX",
    price: 1140000,
    beds: 4,
    baths: 3,
    sqft: 2460,
    lot: "0.21 ac",
    yearBuilt: 2015,
    listedDate: "2024-04-15",
    matchScore: 93,
    hasPriceCut: true,
    mlsStatus: "ACT",
    status: "search",
    type: "House",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dcea4d4d1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "42%",
    markerLeft: "60%",
    description: "Spacious house in the heart of Hyde Park with a chef's kitchen and shaded yard.",
    tags: ["Chef kitchen", "Shaded yard", "Corner lot"]
  },
  {
    id: "prop-3",
    address: "4683 Glenalbyn Drive",
    area: "Mt Washington",
    city: "Los Angeles",
    state: "CA",
    price: 1795000,
    beds: 3,
    baths: 3,
    sqft: 2189,
    lot: "0.15 ac",
    yearBuilt: 2018,
    listedDate: "2024-05-02",
    matchScore: 98,
    mlsStatus: "CS",
    status: "search",
    type: "House",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687940-c52dd0d4405c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "40%",
    markerLeft: "48%",
    description: "Stunning modern home with panoramic views and expansive outdoor living space.",
    tags: ["Modern", "Views", "Open Floor Plan"]
  },
  {
    id: "prop-4",
    address: "3507 Cazador Street",
    area: "Glassell Park",
    city: "Los Angeles",
    state: "CA",
    price: 875000,
    beds: 2,
    baths: 1,
    sqft: 1058,
    lot: "0.12 ac",
    yearBuilt: 1948,
    listedDate: "2024-05-03",
    matchScore: 89,
    mlsStatus: "AC",
    status: "search",
    type: "House",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "46%",
    markerLeft: "42%",
    description: "Charming bungalow with character and potential in a growing area.",
    tags: ["Charming", "Great Value", "Bungalow"]
  },
  {
    id: "prop-5",
    address: "1205 E 7th St",
    area: "East Austin",
    city: "Austin",
    state: "TX",
    price: 645000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    lot: "0.10 ac",
    yearBuilt: 2021,
    listedDate: "2024-05-04",
    matchScore: 92,
    mlsStatus: "PND",
    status: "search",
    type: "Condo",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "44%",
    markerLeft: "58%",
    description: "Modern condo in East Austin with high ceilings and community pool.",
    tags: ["Modern", "Pool", "High Ceilings"]
  },
  {
    id: "prop-6",
    address: "702 Wlake Dr",
    area: "Westlake",
    city: "Austin",
    state: "TX",
    price: 2450000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    lot: "0.45 ac",
    yearBuilt: 2012,
    listedDate: "2024-04-20",
    matchScore: 85,
    isNew: true,
    mlsStatus: "CS",
    status: "search",
    type: "House",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dcea4d4d1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "35%",
    markerLeft: "45%",
    description: "Executive estate in Westlake with pool, outdoor kitchen and views.",
    tags: ["Estate", "Views", "Outdoor Kitchen"]
  },
  {
    id: "prop-7",
    address: "1502 Mueller Blvd",
    area: "Mueller",
    city: "Austin",
    state: "TX",
    price: 925000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    lot: "0.15 ac",
    yearBuilt: 2023,
    listedDate: "2024-05-05",
    matchScore: 97,
    isNew: true,
    mlsStatus: "ACT",
    status: "search",
    type: "House",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687940-c52dd0d4405c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "41%",
    markerLeft: "55%",
    description: "Energy efficient new build in Mueller, steps from the park and lake.",
    tags: ["Solar", "New Build", "Walkable"]
  },
  {
    id: "prop-8",
    address: "804 Congress Ave",
    area: "Downtown Austin",
    city: "Austin",
    state: "TX",
    price: 1250000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    lot: "N/A",
    yearBuilt: 2019,
    listedDate: "2024-05-02",
    matchScore: 94,
    hasPriceCut: true,
    mlsStatus: "ACT",
    status: "search",
    type: "Condo",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop"
    ],
    markerTop: "43%",
    markerLeft: "51%",
    description: "Luxurious downtown loft with floor-to-ceiling windows and concierge.",
    tags: ["Concierge", "Loft", "City Views"]
  }
];

export const initialSavedSearches: SavedSearch[] = [
  {
    id: "search-1",
    name: "Downtown condo sweep",
    location: "Downtown Austin",
    criteria: "2+ beds, under $900K, high match score",
    frequency: "Instant",
    updatedAt: "Today",
    propertyIds: ["prop-1", "prop-4"]
  },
  {
    id: "search-2",
    name: "Westlake family homes",
    location: "Westlake",
    criteria: "4+ beds, pool, new build preferred",
    frequency: "Daily",
    updatedAt: "Yesterday",
    propertyIds: ["prop-2", "prop-3"]
  }
];

export const initialHomeValueListings: HomeValueListing[] = [
  {
    id: "hv-1",
    address: "1205 E 7th St",
    city: "Austin",
    state: "TX",
    zip: "78702",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    estimate: 645000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    status: "Off Market",
    lastUpdated: "2 days ago"
  },
  {
    id: "hv-2",
    address: "2101 S Congress Ave",
    city: "Austin",
    state: "TX",
    zip: "78704",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    estimate: 895000,
    beds: 3,
    baths: 2,
    sqft: 1824,
    status: "Off Market",
    lastUpdated: "5 days ago"
  }
];

export const recentlyListedData: CompProperty[] = [
  {
    address: "2101 S Congress Ave",
    price: "$895,000",
    beds: 3,
    baths: 2,
    sqft: 1824,
    status: "Active",
    meta: "0.4 mi away",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    markerTop: "42%",
    markerLeft: "45%",
  },
  {
    address: "4208 Hyde Park Rd",
    price: "$1,140,000",
    beds: 4,
    baths: 3,
    sqft: 2460,
    status: "Active",
    meta: "0.8 mi away",
    image: "https://images.unsplash.com/photo-1600585154526-990dcea4d4d1?q=80&w=600&auto=format&fit=crop",
    markerTop: "38%",
    markerLeft: "52%",
  },
  {
    address: "1502 Mueller Blvd",
    price: "$925,000",
    beds: 3,
    baths: 3,
    sqft: 2100,
    status: "Coming Soon",
    meta: "1.2 mi away",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop",
    markerTop: "45%",
    markerLeft: "58%",
  }
];

export const recentlySoldData: CompProperty[] = [
  {
    address: "1205 E 7th St",
    price: "$645,000",
    beds: 2,
    baths: 2,
    sqft: 1150,
    status: "Sold",
    meta: "Sold 2 days ago",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=600&auto=format&fit=crop",
    markerTop: "48%",
    markerLeft: "42%",
  },
  {
    address: "804 Congress Ave",
    price: "$1,250,000",
    beds: 2,
    baths: 2,
    sqft: 1450,
    status: "Sold",
    meta: "Sold 5 days ago",
    image: "https://images.unsplash.com/photo-1600607687940-c52dd0d4405c?q=80&w=600&auto=format&fit=crop",
    markerTop: "35%",
    markerLeft: "51%",
  },
  {
    address: "702 Wlake Dr",
    price: "$2,450,000",
    beds: 5,
    baths: 4,
    sqft: 4200,
    status: "Sold",
    meta: "Sold 1 week ago",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=600&auto=format&fit=crop",
    markerTop: "40%",
    markerLeft: "48%",
  }
];
