import * as React from "react";
import type { Metadata } from "next";
import { DemoConfiguratorView } from "@/components/configurator/demo-view";

export const metadata: Metadata = {
  title: "3D Product Configurator | ClutchGear",
  description:
    "Interactive 360-degree real-time 3D hardware configurator for the Clutch One Pro Wireless competitive esports mouse.",
};

export default function DemoPage() {
  return <DemoConfiguratorView />;
}
