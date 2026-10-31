export interface SwatchOption {
  id: string;
  name: string;
  hex: string;
  isOriginal?: boolean;
}

export type SurfaceFinish = "matte" | "glossy";

export interface ConfiguratorState {
  accentColorId: string;
  accentHex: string;
  isOriginal: boolean;
  rgbEnabled: boolean;
  finish: SurfaceFinish;
}

export const SWATCH_OPTIONS: SwatchOption[] = [
  {
    id: "acid-green",
    name: "Acid Green",
    hex: "#A3FF12",
    isOriginal: false,
  },
  {
    id: "original-blue",
    name: "Original Blue",
    hex: "#00B4D8",
    isOriginal: true,
  },
  {
    id: "red",
    name: "Tournament Red",
    hex: "#FF334B",
    isOriginal: false,
  },
  {
    id: "purple",
    name: "Cyber Purple",
    hex: "#A855F7",
    isOriginal: false,
  },
  {
    id: "white",
    name: "Chalk White",
    hex: "#F8FAFC",
    isOriginal: false,
  },
  {
    id: "orange",
    name: "Solar Orange",
    hex: "#FF7A00",
    isOriginal: false,
  },
];

export const DEFAULT_CONFIGURATOR_STATE: ConfiguratorState = {
  accentColorId: "acid-green",
  accentHex: "#A3FF12",
  isOriginal: false,
  rgbEnabled: false,
  finish: "matte",
};

