# CLUTCHGEAR — DESIGN SYSTEM SPECIFICATION
**Version:** 1.0.0  
**Target:** 3D E-Commerce Platform for High-Performance Gaming Peripherals  
**Primary Aesthetic:** 3D & Hyperrealism with Minimal Retro-Futurism Accents  
**Key Constraints:** Strictly NO CRT scanlines, NO noisy grain, NO heavy canvas glow over the 3D viewer.

---

## 1. Design Philosophy & Aesthetic Vision

ClutchGear is engineered for esports enthusiasts and hardware purists who demand precision. The visual language marries **3D & Hyperrealism** (tactile depth, PBR material accuracy, multi-layered ambient occlusion, realistic directional specular highlights) with **controlled Retro-Futurism telemetry** (angular monospace metrics, crisp cyber accents, clean geometric framing).

### Aesthetic Directives:
1. **Hyper-Realistic Hardware First:** The 3D viewer is the undisputed hero. Materials (matte PBT plastic, textured side grips, metallic scroll wheels, and optic lens glass) must be rendered cleanly with uncompromised clarity.
2. **Zero Visual Noise:** Retro-futurism is expressed through typography and sharp telemetry lines—**never** through synthetic CRT scanlines, pixelated shaders, or heavy ambient lens flares that obscure product geometry.
3. **Intentional Color Gravity:** Electric Cyan drives brand identity, interactive state discovery, and telemetry. High-conversion Rose (`#E11D48` / `#F43F5E`) is **strictly isolated to "Add to Cart" and Checkout pathways** to preserve maximum psychological contrast and conversion pull.

---

## 2. Color Palette & Token System

```
+---------------------------------------------------------------------------------------------+
|                                     COLOR SPECTRUM                                          |
|                                                                                             |
|   #080811       #0F0F23       #14142B       #00F0FF       #E11D48       #F8FAFC         |
|  Deep Void     Base Canvas   Surface Card    Elec Cyan    Action Rose   Primary Text        |
+---------------------------------------------------------------------------------------------+
```

### 2.1 Backgrounds & Surfaces
| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--bg-void` | `#080811` | 3D Canvas base & deepest viewport background |
| `--bg-canvas` | `#0F0F23` | Main application backdrop & page body |
| `--surface-1` | `#14142B` | Primary cards, configurator container, docked navbar |
| `--surface-2` | `#1D1D3A` | Nested components, input fields, inactive swatch chips |
| `--surface-3` | `#26264D` | Active selection pills, elevated popovers, tooltips |
| `--surface-glass` | `rgba(20, 20, 43, 0.72)` | Translucent overlays (`backdrop-filter: blur(16px)`) |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Default card and divider borders |
| `--border-strong` | `rgba(255, 255, 255, 0.16)` | Active card borders, modal edges |
| `--border-accent` | `rgba(0, 240, 255, 0.40)` | Interactive focus states & selected configurator tiles |

### 2.2 Brand & Interactive Accents (Electric Cyan)
*Designed to complement obsidian black and electric blue gaming hardware.*
| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--cyan-500` (Main) | `#00F0FF` | Primary brand accent, selected radio rings, key icons, badges |
| `--cyan-400` (Hover) | `#38F9FF` | Button hover state, interactive link hover |
| `--cyan-600` (Deep) | `#00C2CF` | Pressed/active button state |
| `--cyan-tint` | `rgba(0, 240, 255, 0.10)` | Chip backgrounds, subtle active state fills |
| `--cyan-glow` | `0 0 16px rgba(0, 240, 255, 0.35)` | Micro-glow on active status indicators (never over 3D viewer) |

### 2.3 High-Conversion Actions (Action Rose)
*Strict reservation rule: NEVER use this color for badges, informational tags, or secondary buttons.*
| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--rose-600` (Base) | `#E11D48` | Primary "Add to Cart" and "Proceed to Checkout" buttons |
| `--rose-500` (Hover) | `#F43F5E` | Hover state for checkout buttons & promotional banner badge |
| `--rose-700` (Active) | `#BE123C` | Active/pressed state for checkout actions |
| `--rose-tint` | `rgba(225, 29, 72, 0.12)` | Subtle discount tag background |
| `--rose-aura` | `0 8px 24px rgba(225, 29, 72, 0.38)` | Ambient elevation glow on primary checkout button |

### 2.4 Typography & Telemetry Neutrals
| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--text-primary` | `#F8FAFC` | Main headings, feature titles, product names, price values |
| `--text-secondary` | `#94A3B8` | Body descriptions, technical spec labels, inactive links |
| `--text-muted` | `#64748B` | Footnotes, helper text, disabled states |
| `--text-on-cyan` | `#080811` | Text on `--cyan-500` buttons (guarantees WCAG AAA compliance) |
| `--text-on-rose` | `#FFFFFF` | Text on `--rose-600` and `--rose-500` buttons (WCAG AA compliant) |

---

## 3. WCAG Contrast Compliance Audit

All text-to-background combinations were mathematically verified using the W3C Relative Luminance algorithm:

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

| Foreground Token | Background Token | Calculated Ratio | WCAG AA Status | WCAG AAA Status | Usage Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-primary` (`#F8FAFC`) | `--bg-canvas` (`#0F0F23`) | **17.22 : 1** | PASS (Min 4.5:1) | PASS (Min 7.0:1) | Headings, hero labels, key text |
| `--text-primary` (`#F8FAFC`) | `--surface-1` (`#14142B`) | **16.45 : 1** | PASS (Min 4.5:1) | PASS (Min 7.0:1) | Card headings, configurator titles |
| `--text-secondary` (`#94A3B8`)| `--bg-canvas` (`#0F0F23`) | **7.36 : 1** | PASS (Min 4.5:1) | PASS (Min 7.0:1) | Body text, specs, meta info |
| `--cyan-500` (`#00F0FF`) | `--bg-canvas` (`#0F0F23`) | **13.40 : 1** | PASS (Min 4.5:1) | PASS (Min 7.0:1) | Accent badges, telemetry labels |
| `--text-on-cyan` (`#080811`)| `--cyan-500` (`#00F0FF`) | **14.16 : 1** | PASS (Min 4.5:1) | PASS (Min 7.0:1) | **CRITICAL:** Dark text on Cyan buttons |
| `Pure White` (`#FFFFFF`) | `--cyan-500` (`#00F0FF`) | **1.41 : 1** | **FAIL (DO NOT USE)** | **FAIL** | White on cyan is forbidden |
| `--text-on-rose` (`#FFFFFF`)| `--rose-600` (`#E11D48`) | **4.70 : 1** | PASS (Normal & Bold) | PASS (Bold $\ge$ 18pt) | Add to Cart / Checkout buttons |
| `--text-on-rose` (`#FFFFFF`)| `--rose-500` (`#F43F5E`) | **3.67 : 1** | PASS (Bold $\ge$ 14pt) | FAIL for < 14pt | Hover state & bold CTA text ($\ge$ 16px bold) |

---

## 4. Typography System

### 4.1 Font Pairings & Roles
- **Headings & Branding:** [`Chakra Petch`](https://fonts.google.com/specimen/Chakra+Petch) (`weights: 500, 600, 700`)  
  *Tactical, angular geometric sans-serif that echoes high-precision esports hardware.*
- **Body, Specs, UI Labels & Prices:** [`Inter`](https://fonts.google.com/specimen/Inter) (`weights: 400, 500, 600`)  
  *Industry gold standard for legibility, tabular numbers, and optical balance at small sizes.*

```html
<!-- Google Fonts Embed Code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4.2 Type Scale
| Level | Font Family | Size | Weight | Line Height | Tracking | Text Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1 (Hero Title)** | Chakra Petch | 48px – 64px | 700 | 1.05 | -0.02em | Uppercase |
| **Heading 1 (Product Name)**| Chakra Petch | 32px – 40px | 700 | 1.15 | -0.01em | Normal / Uppercase |
| **Heading 2 (Section Title)**| Chakra Petch | 24px – 28px | 600 | 1.25 | 0em | Normal |
| **Heading 3 (Card Title)** | Chakra Petch | 18px – 20px | 600 | 1.35 | 0em | Normal |
| **Heading 4 (Config Header)**| Chakra Petch | 14px – 16px | 600 | 1.40 | +0.02em | Uppercase |
| **Price Hero** | Inter | 28px – 34px | 700 | 1.10 | -0.02em | Tabular numbers |
| **Body Regular** | Inter | 14px – 15px | 400 | 1.60 | 0em | Sentence |
| **Body Small / Specs** | Inter | 12px – 13px | 500 | 1.50 | 0em | Sentence |
| **Micro / Telemetry Badge** | Chakra Petch | 11px | 700 | 1.00 | +0.08em | Uppercase |

---

## 5. Spacing, Elevation & Geometry Rules

### 5.1 Spacing Scale (8pt Grid System)
- `space-1`: `4px` (micro gap between status dot and text)
- `space-2`: `8px` (button internal gap, swatch spacing)
- `space-3`: `12px` (input padding, compact card padding)
- `space-4`: `16px` (standard card padding, component margins)
- `space-5`: `20px` (panel gap)
- `space-6`: `24px` (section inner gap, configurator spacing)
- `space-8`: `32px` (major component separation)
- `space-12`: `48px` (bento grid layout padding)
- `space-16`: `64px` (page section margin)

### 5.2 Border Radius Scale
```css
--radius-sm: 4px;   /* Micro badges, color chip previews */
--radius-md: 8px;   /* Dropdowns, input fields, secondary action buttons */
--radius-lg: 12px;  /* Product configurator cards, bento cells, primary CTA */
--radius-xl: 16px;  /* Main 3D viewport frame, floating dialogs */
--radius-full: 9999px; /* Status pills, toggle switches, round utility buttons */
```

### 5.3 Elevation & Surface Shadows (Tactile 3D Depth)
```css
/* Surface 1: Elevated card depth */
box-shadow: 
  0 4px 20px -2px rgba(0, 0, 0, 0.5),
  0 0 0 1px rgba(255, 255, 255, 0.08) inset;

/* Surface 2: Floating Configurator Dock */
box-shadow: 
  0 20px 48px -4px rgba(0, 0, 0, 0.7),
  0 0 0 1px rgba(255, 255, 255, 0.12) inset;

/* Focused Interactive Halo (Cyan) */
box-shadow: 
  0 0 0 2px #0F0F23, 
  0 0 0 4px #00F0FF;

/* Conversion Aura (Rose) */
box-shadow: 
  0 8px 24px -2px rgba(225, 29, 72, 0.40),
  0 0 0 1px rgba(255, 255, 255, 0.2) inset;
```

---

## 6. Component Specifications

### 6.1 Buttons

#### A. Conversion Primary ("Add to Cart" / "Checkout" ONLY)
* **Visual:** Solid `#E11D48` background with subtle internal top highlight.
* **Text:** `#FFFFFF`, `font-family: 'Chakra Petch'`, `font-weight: 700`, `letter-spacing: 0.04em`, uppercase.
* **Height & Radius:** `52px` desktop / `48px` mobile, `border-radius: 10px`.
* **Hover State:** Background shifts to `#F43F5E`, shadow adds `0 8px 24px rgba(225, 29, 72, 0.45)`, scale `1.015`.
* **Active State:** Background `#BE123C`, scale `0.985`.
* **Transition:** `all 200ms cubic-bezier(0.16, 1, 0.3, 1)`.

#### B. Accent Interactive Button (Configure, Explore 3D, Presets)
* **Visual:** Solid `#00F0FF` background.
* **Text:** `#080811` (Deep void black for 14.16:1 contrast!), `font-family: 'Chakra Petch'`, `font-weight: 700`.
* **Hover State:** Background `#38F9FF`, subtle cyan ambient aura `0 0 20px rgba(0, 240, 255, 0.4)`.
* **Active State:** Background `#00C2CF`, scale `0.985`.

#### C. Secondary / Surface Button (Spec Sheet, Compare, Share)
* **Visual:** Background `#14142B`, border `1px solid rgba(255, 255, 255, 0.12)`.
* **Text:** `#F8FAFC`, `font-family: 'Inter'`, `font-weight: 600`.
* **Hover State:** Border color changes to `#00F0FF`, text color shifts to `#00F0FF`, background `#1D1D3A`.

#### D. 3D Viewer Floating Control Buttons (Orbit, Reset, Zoom, Wireframe)
* **Visual:** 40x40px circle or rounded-8px square, background `rgba(15, 15, 35, 0.85)`, backdrop blur `12px`, border `1px solid rgba(255, 255, 255, 0.12)`.
* **Icon:** 20px SVG (Lucide/Heroicons), stroke `#94A3B8`.
* **Hover:** Stroke `#00F0FF`, border-color `#00F0FF`, background `#14142B`.

---

### 6.2 Cards & Bento Grid Cells

#### A. Glass Surface Card
* **Base:** `background: rgba(20, 20, 43, 0.70); backdrop-filter: blur(14px);`
* **Border:** `1px solid rgba(255, 255, 255, 0.08);`
* **Radius:** `12px`
* **Hover Behavior:** Border transitions to `rgba(0, 240, 255, 0.35)`, subtle top-edge illumination via linear gradient border.

#### B. Spec Bento Grid Item
* **Layout:** Top row holds tactical category tag (`CHAKRA PETCH 11px uppercase in #00F0FF`), middle features bold metric (`Inter 28px bold in #F8FAFC`), bottom holds short description (`Inter 13px in #94A3B8`).
* **Visual Cue:** Subtle corner notch or 1px hairline divider to evoke high-end peripheral packaging.

---

### 6.3 Floating Glass Navbar
* **Layout:** Floating sticky dock (`top-4 left-4 right-4` with `max-width: 1280px` auto-centered).
* **Surface:** `background: rgba(15, 15, 35, 0.82); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px;`.
* **Logo:** `"CLUTCH"` in `#F8FAFC` + `"GEAR"` in `#00F0FF`, `font-family: 'Chakra Petch'`, `font-weight: 700`, `letter-spacing: 0.06em`.
* **Nav Links:** `font-family: 'Inter'`, `font-size: 14px`, `color: #94A3B8`, hover `color: #00F0FF`. Active item has an understated 2px cyan line under it.
* **Cart Indicator:** Circular counter badge with subtle pulse on item addition.

---

### 6.4 Inputs & Configurator Selectors

#### A. Color Swatch Selector (For Mouse Shell Finish)
* **Dimensions:** 38x38px round swatches.
* **Border Default:** `2px solid rgba(255, 255, 255, 0.12)`.
* **Selected State:** Outer cyan ring offset by 2px void background (`box-shadow: 0 0 0 2px #0F0F23, 0 0 0 4px #00F0FF`).
* **Hover State:** Micro-scale `1.08` with transition `150ms ease`.
* **Palette Options:**
  - *Stealth Obsidian:* `#121216` with matte finish
  - *Electric Cyan Edition:* `#0F172A` chassis with `#00F0FF` accents
  - *Cyber White:* `#E2E8F0` chassis with deep black grips

#### B. Segmented Option Toggle (Sensor DPI / Grip Style)
* **Container:** Background `#0B0B16`, border `1px solid rgba(255, 255, 255, 0.08)`, radius `10px`, padding `4px`.
* **Item:** Chakra Petch 13px, weight 600, padding `8px 16px`, radius `8px`.
* **Active Item:** Background `#1D1D3A`, text `#00F0FF`, border `1px solid rgba(0, 240, 255, 0.25)`.

#### C. Quantity Stepper
* **Container:** Height 44px, surface `#14142B`, border `1px solid rgba(255, 255, 255, 0.12)`, radius `8px`.
* **Buttons:** `+` and `-` with hover background `rgba(255, 255, 255, 0.06)`. Number display in `Inter 14px bold`.

---

### 6.5 Badges & Telemetry Pills
* **Rule:** Chakra Petch 11px, weight 700, uppercase, letter-spacing `0.08em`, border-radius `4px`, padding `4px 8px`.
* **New Release:** `bg: rgba(0, 240, 255, 0.12); text: #00F0FF; border: 1px solid rgba(0, 240, 255, 0.35);`
* **In Stock:** `bg: rgba(16, 185, 129, 0.12); text: #10B981; border: 1px solid rgba(16, 185, 129, 0.35);`
* **Tech Spec (e.g. "54 GRAMS", "PAW3395"):** `bg: rgba(255, 255, 255, 0.06); text: #E2E8F0; border: 1px solid rgba(255, 255, 255, 0.12);`
* **Discount Tag (e.g. "-15% OFF"):** `bg: rgba(225, 29, 72, 0.15); text: #F43F5E; border: 1px solid rgba(225, 29, 72, 0.35);`

---

## 7. Product Page Architecture (3D Viewer + Configurator)

```
+---------------------------------------------------------------------------------------------+
|  [ FLOATING NAVBAR: LOGO (CLUTCHGEAR)  |  PRODUCTS  SPECS  SUPPORT  |  CART ($149) ]        |
+---------------------------------------------------------------------------------------------+
|                                                                                             |
|   ===================== 3D HERO VIEWPORT =====================    ===== CONFIG PANEL =====  |
|  |                                                            |  | [NEW LAUNCH]            | |
|  |   [3D Canvas: Realistic Black & Cyan Gaming Mouse]         |  | CLUTCH ONE PRO WIRELESS | |
|  |   - PBR Lighting: Key light + Rim light                    |  | $149.00 USD             | |
|  |   - Studio shadow plane                                    |  |                         | |
|  |   - Zero scanlines / zero obscuring glow                   |  | FINISH:                 | |
|  |                                                            |  | (•) Obsidian ( ) Cyan   | |
|  |   [Floating Viewport Controls]                             |  |                         | |
|  |   (↻ Reset) (⌕ Zoom) (⚡ Exploded) (RGB Toggle)             |  | SENSOR / POLLING:       | |
|  |                                                            |  | [ 1000Hz ] [ 4000Hz ]   | |
|  |                                                            |  |                         | |
|  |                                                            |  | [⚡ ADD TO CART - $149 ] | |
|  |                                                            |  |   (Rose #E11D48 CTA)    | |
|   ============================================================    =========================  |
|                                                                                             |
|   ------------------------- BENTO GRID SPECIFICATIONS ------------------------------------  |
|  [ 54g Ultra-Light ]  [ PAW3395 26K DPI ]  [ Optical Switches ]  [ 80-Hour Battery Life ]   |
+---------------------------------------------------------------------------------------------+
```

### 7.1 3D Canvas Guidelines
1. **Lighting & Texture Balance:**
   - Use Three.js / WebGL with ACESFilmicToneMapping.
   - Neutral ambient light (`intensity: 0.8`) + cool directional key light (`#E0F2FE`, `intensity: 1.5`) + subtle electric cyan rim light (`#00F0FF`, `intensity: 2.0`) positioned behind the model to trace the peripheral contours.
   - Ground shadow: Subtle contact shadow using soft contact shadow shader or baked shadow plane with opacity `0.45` on `#080811`.
2. **Viewport Overlay Safeguards:**
   - Canvas background is transparent or strictly matched to `#080811`.
   - Never place full-bleed ambient gradients or glow overlays over the canvas. All glow effects must be contained inside specific HUD buttons.
   - Provide an unobstructed 360° interaction boundary with pointer capture (`touch-action: none` on canvas).
3. **Responsive Configurator Behavior:**
   - **Desktop ($\ge$ 1024px):** 60/40 or 65/35 split. Left 3D viewport takes remaining viewport height; right configurator panel scrolls independently with sticky purchase bar.
   - **Mobile (< 1024px):** 3D viewport occupies top 50vh with touch rotate; configurator panel is docked below as an interactive sheet with sticky bottom "Add to Cart" button.

### 7.2 Loading & WebGL Fallback
- **Progressive Loader:** While `.glb` (e.g. `mouse-optimized.glb`) is buffering, display an animated circular wireframe with Chakra Petch percentage readout (`0% -> 100%`) in `#00F0FF`.
- **Hardware Fallback:** If WebGL is unsupported or encounters context loss, seamlessly render high-resolution 3D studio render images with interactive 360 thumbnail drag.

---

## 8. CSS Implementation Tokens

Add these variables directly to your global styles (`index.css` or Tailwind config):

```css
:root {
  /* Canvas & Surfaces */
  --bg-void: #080811;
  --bg-canvas: #0F0F23;
  --surface-1: #14142B;
  --surface-2: #1D1D3A;
  --surface-3: #26264D;
  --surface-glass: rgba(20, 20, 43, 0.72);
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-accent: rgba(0, 240, 255, 0.40);

  /* Primary Accent: Electric Cyan */
  --cyan-500: #00F0FF;
  --cyan-400: #38F9FF;
  --cyan-600: #00C2CF;
  --cyan-tint: rgba(0, 240, 255, 0.10);

  /* Conversion: Action Rose (Checkout only) */
  --rose-600: #E11D48;
  --rose-500: #F43F5E;
  --rose-700: #BE123C;
  --rose-tint: rgba(225, 29, 72, 0.12);

  /* Typography */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --text-on-cyan: #080811;
  --text-on-rose: #FFFFFF;

  /* Fonts */
  --font-heading: 'Chakra Petch', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 9. Pre-Delivery Quality Checklist

Before shipping any UI component or page for ClutchGear, verify every item:

- [ ] **Icon Quality:** 100% SVG icons (Lucide or Heroicons). Zero emoji icons used in UI.
- [ ] **WCAG Compliance:** All cyan action buttons use `#080811` dark text (14.16:1 contrast ratio). All checkout buttons use `#E11D48` with bold `#FFFFFF` text ($\ge$ 4.70:1 contrast).
- [ ] **Color Discipline:** The Rose color (`#E11D48` / `#F43F5E`) is NOT used for standard badges or decorative widgets; it is reserved exclusively for the purchase funnel.
- [ ] **3D Viewer Purity:** The 3D viewer is free from CRT scanlines, fuzzy TV static, and heavy wash-out glow.
- [ ] **Interaction Stability:** All hover states use smooth color and shadow transitions (150–250ms). Zero layout shifts or jittery scale transforms.
- [ ] **Touch & Mouse Safety:** All clickable cards and swatches have `cursor: pointer`. Interactive targets meet the minimum 44x44px touch boundary.
- [ ] **A11y & Motion:** Focus visible rings exist for all interactive elements. `prefers-reduced-motion` suppresses 3D camera auto-rotation and intense transitions.
- [ ] **Responsive Integrity:** Tested and responsive across standard breakpoints (375px mobile, 768px tablet, 1024px laptop, 1440px+ ultra-wide).
