import {
  Building2,
  Wrench,
  Brush,
  ShieldCheck,
  Users,
  MonitorSmartphone,
  Leaf,
  Hospital,
  ShoppingBag,
  Factory,
  Hotel,
  Home,
  GraduationCap,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  image: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "property-management",
    image: encodeURI("/image/Property Management.png"),
    title: "Property Management",
    short: "PROPERTY MANAGEMENT",
    description:
      "End-to-end management of commercial, residential, and industrial properties.",
    icon: Building2,
    points: [
      "Asset lifecycle & compliance management",
      "Tenant onboarding and relationship handling",
      "Budgeting, billing and vendor governance",
      "Periodic audits and performance reporting",
    ],
  },
  {
    slug: "technical-management",
    image: encodeURI("/image/Technical Management.png"),
    title: "Technical Management",
    short: "TECHNICAL MANAGEMENT",
    description:
      "MEP, HVAC, electrical, plumbing, and infrastructure maintenance with expert care.",
    icon: Wrench,
    points: [
      "Preventive & predictive maintenance plans",
      "HVAC, DG, UPS and electrical upkeep",
      "Water, plumbing and fire systems",
      "Energy optimisation and load balancing",
    ],
  },
  {
    slug: "soft-services",
    image: encodeURI("/image/Soft Services.png"),
    title: "Soft Services",
    short: "SOFT SERVICES",
    description:
      "Housekeeping, waste management, pantry, landscaping, and more for smooth operations.",
    icon: Brush,
    points: [
      "Trained housekeeping teams & SOPs",
      "Pantry, cafeteria and pest control",
      "Waste segregation and disposal",
      "Landscaping and façade cleaning",
    ],
  },
  {
    slug: "security-management",
    image: encodeURI("/image/Security Management.png"),
    title: "Security Management",
    short: "SECURITY MANAGEMENT",
    description:
      "Trained manpower, access control, surveillance, and 24/7 security operations.",
    icon: ShieldCheck,
    points: [
      "Licensed and vetted security personnel",
      "Access control and visitor management",
      "CCTV monitoring and incident response",
      "Emergency drills and safety protocols",
    ],
  },
  {
    slug: "business-support",
    image: encodeURI("/image/Business Support.png"),
    title: "Business Support",
    short: "BUSINESS SUPPORT",
    description:
      "Reception, admin support, helpdesk, and other business enablement services.",
    icon: Users,
    points: [
      "Front office and reception staffing",
      "24x7 helpdesk and ticketing",
      "Mailroom and travel desk support",
      "Event and meeting room management",
    ],
  },
  {
    slug: "smart-facility-solutions",
    image: encodeURI("/image/Smart Facility Solutions.png"),
    title: "Smart Facility Solutions",
    short: "SMART FACILITY SOLUTIONS",
    description:
      "Automation, IoT, smart monitoring, and digital reporting for intelligent facilities.",
    icon: MonitorSmartphone,
    points: [
      "IoT sensors and BMS integration",
      "Live dashboards and SLA analytics",
      "Mobile app based work orders",
      "Predictive alerts and asset tagging",
    ],
  },
  {
    slug: "sustainability-solutions",
    image: encodeURI("/image/Sustainability Solutions.png"),
    title: "Sustainability Solutions",
    short: "SUSTAINABILITY SOLUTIONS",
    description:
      "Energy management, green building initiatives, and sustainable operations.",
    icon: Leaf,
    points: [
      "Energy and water audits",
      "Green building certification support",
      "Carbon footprint tracking",
      "Waste-to-resource programmes",
    ],
  },
];

export type Industry = {
  name: string;
  icon: LucideIcon;
  blurb: string;
  image: string;
};

export const industries: Industry[] = [
  {
    name: "Corporate Offices",
    icon: Building2,
    blurb: "Workplace experience and uptime for corporate campuses.",
    image: "/industries/sector-corporate.jpg",
  },
  {
    name: "Healthcare",
    icon: Hospital,
    blurb: "Hygiene-critical operations for hospitals and clinics.",
    image: "/industries/sector-healthcare.jpg",
  },
  {
    name: "Retail & Malls",
    icon: ShoppingBag,
    blurb: "Footfall-ready upkeep, safety and visitor comfort.",
    image: "/industries/sector-retail.jpg",
  },
  {
    name: "Industrial",
    icon: Factory,
    blurb: "Plant maintenance, safety compliance and manpower.",
    image: "/industries/sector-industrial.jpg",
  },
  {
    name: "Hospitality",
    icon: Hotel,
    blurb: "Guest-grade housekeeping and technical reliability.",
    image: "/industries/sector-hospitality.jpg",
  },
  {
    name: "Residential",
    icon: Home,
    blurb: "Society management, security and resident helpdesk.",
    image: "/industries/sector-residential.jpg",
  },
  {
    name: "Education",
    icon: GraduationCap,
    blurb: "Safe, clean and well-run campuses for institutions.",
    image: "/industries/sector-education.jpg",
  },
  {
    name: "Government",
    icon: Landmark,
    blurb: "Compliant facility operations for public infrastructure.",
    image: "/industries/sector-government.jpg",
  },
];

export const stats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "120+", label: "Happy Clients" },
  { value: "8+", label: "Years of Excellence" },
  { value: "24/7", label: "Support & Operations" },
];

export const clients = [
  "DLF",
  "Godrej",
  "TATA",
  "Wipro",
  "Prestige",
  "CapitaLand",
  "& More",
];

export const testimonials = [
  {
    quote:
      "PFMC has been instrumental in maintaining our facilities with professionalism and efficiency. Their response time is excellent.",
    name: "Facilities Manager",
    role: "IT Company",
  },
  {
    quote:
      "Their integrated approach and technology driven solutions have significantly improved our operational efficiency.",
    name: "Operations Head",
    role: "Healthcare Group",
  },
  {
    quote:
      "A reliable partner committed to quality, safety, and sustainability. Highly recommended!",
    name: "Admin Director",
    role: "Corporate Office",
  },
];

export const projects = [
  {
    name: "Cyber Park Corporate Campus",
    slug: "cyber-park-corporate-campus",
    type: "Corporate Offices",
    area: "1.2 Mn sq.ft",
    city: "Gurugram",
    image: encodeURI("/assets/projects/Corporate Offices.png"),
    description:
      "Complete facility management for a premier corporate campus with 24/7 operations, security, and world-class amenities.",
    teamSize: "85+",
    completionYear: "2023",
    client: "Leading IT Company",
  },
  {
    name: "Meridian Multi-Speciality Hospital",
    slug: "meridian-multi-speciality-hospital",
    type: "Healthcare",
    area: "450k sq.ft",
    city: "Pune",
    image: encodeURI("/assets/projects/Healthcare.png"),
    description:
      "Hygiene-critical facility management with specialized healthcare protocols and emergency response systems.",
    teamSize: "120+",
    completionYear: "2023",
    client: "Meridian Healthcare Group",
  },
  {
    name: "Grand Central Mall",
    slug: "grand-central-mall",
    type: "Retail & Malls",
    area: "800k sq.ft",
    city: "Noida",
    image: encodeURI("/assets/projects/Retail & Malls.png"),
    description:
      "High-footfall retail facility management with crowd management, safety, and visitor comfort solutions.",
    teamSize: "65+",
    completionYear: "2022",
    client: "Grand Central Group",
  },
  {
    name: "Northline Manufacturing Unit",
    slug: "northline-manufacturing-unit",
    type: "Industrial",
    area: "600k sq.ft",
    city: "Chennai",
    image: encodeURI("/assets/projects/Industrial.png"),
    description:
      "Industrial facility management with safety compliance, plant maintenance, and skilled manpower deployment.",
    teamSize: "100+",
    completionYear: "2024",
    client: "Northline Industries",
  },
  {
    name: "Lakeview Residences",
    slug: "lakeview-residences",
    type: "Residential",
    area: "1,400 units",
    city: "Bengaluru",
    image: encodeURI("/assets/projects/Residential.png"),
    description:
      "Premium residential community management with 24/7 security, maintenance, and resident helpdesk services.",
    teamSize: "45+",
    completionYear: "2023",
    client: "Lakeview Developers",
  },
  {
    name: "Sunrise International School",
    slug: "sunrise-international-school",
    type: "Education",
    area: "300k sq.ft",
    city: "Hyderabad",
    image: encodeURI("/assets/projects/Education.png"),
    description:
      "Educational campus facility management with safety, cleanliness, and a conducive learning environment.",
    teamSize: "40+",
    completionYear: "2024",
    client: "Sunrise Education Trust",
  },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/projects", label: "Projects" },
  { to: "/clients", label: "Clients" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;