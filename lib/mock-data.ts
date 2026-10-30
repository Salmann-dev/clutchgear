export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  badge?: string;
  inStock: boolean;
  specs: {
    label: string;
    value: string;
  }[];
  description: string;
  features: string[];
}

export interface BentoSpec {
  id: string;
  tag: string;
  title: string;
  stat: string;
  unit?: string;
  description: string;
  span: "col-span-1" | "col-span-2";
  icon: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "clutch-one-pro",
    name: "Clutch One Pro Wireless",
    tagline: "Tournament-Grade Ultra-Light Gaming Mouse",
    category: "Mice",
    price: 149,
    badge: "Flagship",
    inStock: true,
    description:
      "Crafted with our proprietary HyperTrack Gen-3 optical sensor, LightBeam optical micro-switches, and 4000Hz wireless polling inside a solid 54g unibody chassis.",
    specs: [
      { label: "Weight", value: "54g Unibody" },
      { label: "Sensor", value: "HyperTrack Gen-3 (26K DPI)" },
      { label: "Polling Rate", value: "4000Hz (0.25ms)" },
      { label: "Battery", value: "85 Hours Continuous" },
    ],
    features: [
      "Zero-hole solid structural chassis",
      "Sub-0.2ms optical switch actuation",
      "OmniLink 2.4GHz low-latency wireless",
      "100% Virgin Grade PTFE glide skates",
    ],
  },
  {
    id: "clutch-apex-60",
    name: "Clutch Apex-60 Keypad",
    tagline: "Rapid-Trigger Magnetic Gaming Keypad",
    category: "Keypads",
    price: 129,
    badge: "New Launch",
    inStock: true,
    description:
      "Engineered with FluxPoint Hall-effect magnetic switches with 0.1mm to 4.0mm continuous adjustable actuation and instant reset for razor-sharp counter-strafing.",
    specs: [
      { label: "Switches", value: "FluxPoint Hall-Effect" },
      { label: "Actuation Range", value: "0.1mm - 4.0mm" },
      { label: "Polling Rate", value: "8000Hz Hyper-Link" },
      { label: "Keycaps", value: "Textured PBT Double-Shot" },
    ],
    features: [
      "Dynamic Rapid-Trigger technology",
      "CNC machined aerospace-grade top frame",
      "Individual per-key RGB telemetry",
      "Onboard memory profiles for zero bloatware",
    ],
  },
  {
    id: "clutch-pulse-7",
    name: "Clutch Pulse-7 Headset",
    tagline: "Planar Spatial Audio Wireless Headset",
    category: "Audio",
    price: 179,
    badge: "Spatial Sound",
    inStock: false,
    description:
      "Custom 50mm Planar-Core neodymium drivers deliver acoustic positional accuracy with ultra-low latency wireless telemetry and breathable memory foam isolation.",
    specs: [
      { label: "Acoustics", value: "50mm Planar-Core" },
      { label: "Frequency", value: "10Hz - 45,000Hz" },
      { label: "Latency", value: "<12ms Lossless OmniLink" },
      { label: "Battery Life", value: "60 Hours Quick-Charge" },
    ],
    features: [
      "Zero-compression planar acoustic drivers",
      "Detachable broadcast-grade capsule mic",
      "Dual wireless (2.4GHz + Bluetooth 5.3)",
      "High-density cooling gel ear cushions",
    ],
  },
];

export const BENTO_SPECS: BentoSpec[] = [
  {
    id: "ultra-light",
    tag: "AERO-SHELL TECH",
    title: "Honeycomb-Free Unibody Architecture",
    stat: "54g",
    unit: "NET WEIGHT",
    description:
      "Ultra-dense injection-molded shell achieves competitive featherweight balance without porous cutouts, ensuring resistance against dust, sweat, and structural flex.",
    span: "col-span-2",
    icon: "Feather",
  },
  {
    id: "tracking-engine",
    tag: "TELEMETRY ENGINE",
    title: "HyperTrack Gen-3 Optical Sensor",
    stat: "26,000",
    unit: "DPI / 650 IPS",
    description:
      "Raw 1:1 motion tracking with 99.8% resolution accuracy, completely devoid of artificial smoothing, angle snapping, or hardware acceleration.",
    span: "col-span-1",
    icon: "Crosshair",
  },
  {
    id: "wireless-polling",
    tag: "ZERO LATENCY",
    title: "OmniLink 4000Hz Polling",
    stat: "0.25ms",
    unit: "REPORT INTERVAL",
    description:
      "Transfers data packets 4x faster than standard gaming mice, syncing perfectly with high-refresh rate esports monitors for near-zero motion blur.",
    span: "col-span-1",
    icon: "Zap",
  },
  {
    id: "actuation-tech",
    tag: "TACTILE RESPONSE",
    title: "LightBeam Optical Micro-Switches",
    stat: "100M",
    unit: "CLICK LIFESPAN",
    description:
      "Infrared light actuation eliminates physical debounce delay, ensuring instantaneous registration and permanent immunity against double-click wear.",
    span: "col-span-2",
    icon: "Activity",
  },
];

export const WHY_CLUTCHGEAR_PILLARS = [
  {
    title: "Tournament Rigor",
    subtitle: "Built for Esports Arenas",
    description:
      "Every curve, switch tolerance, and sensor placement is calibrated alongside competitive players to perform under extreme tournament pressure.",
    icon: "Trophy",
  },
  {
    title: "Pure Tactile Ergonomics",
    subtitle: "Zero Hand Fatigue",
    description:
      "Anatomically balanced grip profiles optimize claw, fingertip, and palm grip stability during rapid flick shots and micro-adjustments.",
    icon: "ShieldCheck",
  },
  {
    title: "Zero Bloatware Firmware",
    subtitle: "True Onboard Memory",
    description:
      "Configure your DPI stages, polling rate, and debounce settings directly on hardware or via a lightweight browser configurator with no background bloatware.",
    icon: "Cpu",
  },
  {
    title: "Frictionless PTFE Glides",
    subtitle: "Pure Uncut Glide Dynamics",
    description:
      "Curved 100% virgin PTFE feet reduce surface friction coefficients, producing buttery-smooth glide control across both speed and control pads.",
    icon: "Compass",
  },
];
