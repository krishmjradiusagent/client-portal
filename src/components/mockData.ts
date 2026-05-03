export type RouteKey =
  | "search"
  | "matches"
  | "my-searches"
  | "interested"
  | "not-interested"
  | "profile"
  | "settings";

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
  matchScore: number;
  status: string;
  type: string;
  image: string;
  markerTop: string;
  markerLeft: string;
  description: string;
  tags: string[];
};

export type SavedSearch = {
  id: string;
  name: string;
  location: string;
  criteria: string;
  frequency: string;
  updatedAt: string;
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
  { value: "match-desc", label: "Match score" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "beds-desc", label: "Beds" },
  { value: "sqft-desc", label: "Square feet" },
  { value: "newest", label: "Newest" }
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
export const yearOptions = ["Any", "2015+", "2020+", "New build"];
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
    matchScore: 96,
    status: "New",
    type: "Townhome",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    markerTop: "31%",
    markerLeft: "58%",
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
    lot: "0.19 ac",
    yearBuilt: 2021,
    matchScore: 93,
    status: "Price cut",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    markerTop: "23%",
    markerLeft: "34%",
    description: "Modern family home with vaulted ceilings, chef kitchen, and shaded backyard.",
    tags: ["Chef kitchen", "Shaded yard", "Corner lot"]
  },
  {
    id: "prop-3",
    address: "1111 W 6th St #408",
    area: "Downtown Austin",
    city: "Austin",
    state: "TX",
    price: 725000,
    beds: 2,
    baths: 2,
    sqft: 1312,
    lot: "N/A",
    yearBuilt: 2019,
    matchScore: 90,
    status: "Open house",
    type: "Condo",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
    markerTop: "44%",
    markerLeft: "49%",
    description: "Lock-and-leave condo with skyline views and a concierge lobby.",
    tags: ["Skyline", "Concierge", "Pool"]
  },
  {
    id: "prop-4",
    address: "801 Baylor St",
    area: "Clarksville",
    city: "Austin",
    state: "TX",
    price: 1495000,
    beds: 4,
    baths: 4,
    sqft: 2980,
    lot: "0.11 ac",
    yearBuilt: 2023,
    matchScore: 88,
    status: "New",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    markerTop: "38%",
    markerLeft: "27%",
    description: "Architect-designed new build with clean lines and a shaded pool courtyard.",
    tags: ["New build", "Pool", "Designer"]
  },
  {
    id: "prop-5",
    address: "1600 E 6th St #12",
    area: "East Austin",
    city: "Austin",
    state: "TX",
    price: 615000,
    beds: 2,
    baths: 2,
    sqft: 1084,
    lot: "N/A",
    yearBuilt: 2017,
    matchScore: 86,
    status: "Hot",
    type: "Condo",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    markerTop: "56%",
    markerLeft: "67%",
    description: "Compact loft with city access, exposed brick, and a rooftop deck.",
    tags: ["Loft", "Deck", "Walk score 92"]
  },
  {
    id: "prop-6",
    address: "3707 Rollingwood Dr",
    area: "Westlake",
    city: "Austin",
    state: "TX",
    price: 2380000,
    beds: 5,
    baths: 5,
    sqft: 3822,
    lot: "0.31 ac",
    yearBuilt: 2020,
    matchScore: 84,
    status: "MLS",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    markerTop: "17%",
    markerLeft: "15%",
    description: "Premium ridge home with panoramic windows and a resort-style pool.",
    tags: ["Pool", "Views", "Luxury"]
  },
  {
    id: "prop-7",
    address: "5002 Trailside Ln",
    area: "Mueller",
    city: "Austin",
    state: "TX",
    price: 788000,
    beds: 3,
    baths: 3,
    sqft: 1768,
    lot: "0.08 ac",
    yearBuilt: 2022,
    matchScore: 82,
    status: "New",
    type: "Townhome",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    markerTop: "63%",
    markerLeft: "42%",
    description: "Low-maintenance home with pocket park access and a flexible bonus room.",
    tags: ["Pocket park", "Bonus room", "Solar"]
  },
  {
    id: "prop-8",
    address: "1414 Barton Springs Rd",
    area: "Zilker",
    city: "Austin",
    state: "TX",
    price: 1045000,
    beds: 3,
    baths: 2,
    sqft: 1590,
    lot: "0.17 ac",
    yearBuilt: 2016,
    matchScore: 79,
    status: "Pending",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    markerTop: "71%",
    markerLeft: "23%",
    description: "Renovated bungalow with mature trees and quick trail access.",
    tags: ["Bungalow", "Trail access", "Renovated"]
  }
];

export const initialSavedSearches: SavedSearch[] = [
  {
    id: "search-1",
    name: "Downtown condo sweep",
    location: "Downtown Austin",
    criteria: "2+ beds, under $900K, high match score",
    frequency: "Instant",
    updatedAt: "Today"
  },
  {
    id: "search-2",
    name: "Westlake family homes",
    location: "Westlake",
    criteria: "4+ beds, pool, new build preferred",
    frequency: "Daily",
    updatedAt: "Yesterday"
  }
];
