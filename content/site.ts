export const site = {
  name: "Sagnik Dey",
  title: "Principal Product Designer",
  tenure: "16+ years",
  email: "sagnikd@gmail.com",
  linkedin: "https://www.linkedin.com/in/deysagnik/",
  resume: "/resume.pdf",
};

export const proof = [
  { value: "16+ yrs", label: "Enterprise SaaS design" },
  { value: "85", label: "SagUI components, Figma ↔ code" },
  { value: "6", label: "MCP tools for AI agents" },
  // TODO: replace with a sourced 7-UI outcome, or delete this entry before publishing.
  { value: "[X%]", label: "[Sourced 7-UI outcome]" },
];

export const approach = [
  { title: "Understand", text: "Research the people, the business and the constraints", output: "insight" },
  { title: "Structure", text: "Model the data, IA and workflows before the pixels", output: "model" },
  { title: "Design", text: "Interfaces that make complex work feel simple", output: "product" },
  { title: "Systematize", text: "Tokens, components and rules — 7-UI, SagUI", output: "system", highlight: true },
  { title: "Scale", text: "Enable teams — and AI agents — to build on it", output: "adoption" },
];

export type CollageImage = { src: string; alt: string; role: "front" | "back-left" | "back-right"; style: string };

export type Project = {
  slug: string;
  number: string;
  title: string;
  tag: { label: string; variant: "fill" | "outline" | "accent-outline" };
  year: string;
  description: string;
  meta?: string;
  role: string;
  live?: { href: string; label: string };
  caption?: string;
  images: CollageImage[];
  flagship?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sagui",
    number: "01",
    title: "SagUI",
    tag: { label: "System", variant: "fill" },
    year: "2026",
    description: "A design system built for people and AI agents, so new apps get assembled from proven parts instead of invented.",
    meta: "85 components · two-tier tokens · MCP server",
    live: { href: "https://sagui-docs.vercel.app/", label: "Live docs" },
    caption: "FIGMA → TOKENS → CODE → MCP",
    flagship: true,
    featured: true,
    role: "Design Systems Lead & Design-Engineer",
    images: [
      { src: "/images/sagui/figma-color.png", alt: "SagUI color variables in Figma", role: "back-left", style: "left-[6%] top-[52px] w-[52%]" },
      { src: "/images/sagui/storybook.png", alt: "SagUI Storybook", role: "back-right", style: "right-[5%] top-[36px] w-[46%]" },
      { src: "/images/sagui/docs-home.png", alt: "SagUI documentation site", role: "front", style: "left-[22%] top-[150px] w-[58%]" },
    ],
  },
  {
    slug: "mdm",
    number: "02",
    title: "MDM Platform",
    tag: { label: "Platform", variant: "outline" },
    year: "2025–26",
    featured: true,
    role: "Product Designer & Design-Engineer",
    description: "Enterprise master data for convenience-store vendors: admin and vendor portals, staging-and-approval workflows, and a shipped design system.",
    live: { href: "https://design-system-three-brown.vercel.app/", label: "Live UI kit" },
    images: [
      { src: "/images/mdm/design-system.png", alt: "MDM design system components", role: "back-left", style: "left-[8%] top-[36px] w-[62%]" },
      { src: "/images/mdm/mdm_productspage.png", alt: "MDM products page", role: "front", style: "-right-[6%] top-[96px] w-[78%]" },
    ],
  },
  {
    slug: "sales-analytics",
    number: "03",
    title: "Sales Analytics",
    tag: { label: "Built on SagUI", variant: "accent-outline" },
    year: "2026",
    featured: true,
    role: "Product Designer & Design-Engineer",
    description: "A 10-store dashboard that turns alerts into tracked actions: best and worst sellers, store comparisons and inventory risk.",
    live: { href: "https://sales-analytics-delta-one.vercel.app/", label: "Live demo" },
    images: [
      { src: "/images/sales-analytics/dashboard.png", alt: "Sales Analytics dashboard", role: "front", style: "-left-[6%] top-[40px] w-[80%]" },
      { src: "/images/sales-analytics/alerts.png", alt: "Sales Analytics alerts", role: "back-right", style: "right-[6%] top-[130px] w-[50%]" },
    ],
  },
  {
    slug: "quickstop-ios",
    number: "04",
    title: "QuickStop iOS",
    tag: { label: "Product", variant: "outline" },
    year: "2025–26",
    role: "Product Designer & iOS Developer",
    description: "End-to-end convenience-store iOS experience — research, flows and a design system in SwiftUI, built for certainty at the point of need.",
    images: [
      { src: "/images/quickstop/onboarding-flow.png", alt: "QuickStop onboarding flow", role: "back-left", style: "left-[4%] top-[40px] w-[70%]" },
      { src: "/images/quickstop/you-tab.png", alt: "QuickStop You tab", role: "front", style: "right-[8%] top-[56px] w-[24%]" },
    ],
  },
  {
    slug: "vesta",
    number: "05",
    title: "Vesta",
    tag: { label: "Product", variant: "outline" },
    year: "2026 – ongoing",
    role: "Product Designer & Solo Builder",
    description: "A pantry-intelligence iOS app — voice, barcode and receipt logging, designed through Design Thinking as a solo build.",
    images: [
      { src: "/images/vesta/onboarding-welcome.png", alt: "Vesta onboarding welcome screen", role: "back-left", style: "left-[12%] top-[56px] w-[22%]" },
      { src: "/images/vesta/voice-logging.png", alt: "Vesta voice logging screen", role: "back-right", style: "right-[12%] top-[56px] w-[22%]" },
      { src: "/images/vesta/home-screen-converged.png", alt: "Vesta home screen", role: "front", style: "left-[39%] top-[32px] w-[22%]" },
    ],
  },
];

export type Quote = { quote: string; name: string; role: string; lead?: boolean; placeholder?: boolean };

export const quotes: Quote[] = [
  { quote: "He would be assigned to the most difficult, complex designs—and would knock them out of the park every time.", name: "EDDY RUZ", role: "Sr. Principal Lead, Bazaarvoice", lead: true },
  { quote: "I've seen him tackle massive projects for Fortune 500 Companies like Best Buy, Walmart, HP and countless others. He's decisive and intuitive.", name: "BILLY HOLLIS", role: "Developer & Designer" },
  // TODO: replace with a real quote from a 7-Eleven engineer or PM about 7-UI.
  { quote: "[Quote from a 7-Eleven engineer or PM about 7-UI, or how you structured their product]", name: "[NAME]", role: "[Role, 7-Eleven GSC]", placeholder: true },
];
