import * as React from "react";
import { FEATURED_PRODUCTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, SlidersHorizontal, Eye } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section id="featured" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-accent">
                PRO HARDWARE LINEUP
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary uppercase tracking-tight">
              FEATURED PERIPHERALS
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md font-body">
            Tournament-tested hardware engineered with zero bloatware, proprietary sensor engines, and pure tactile actuation.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-surface-1/70 border border-white/10 hover:border-accent/40 transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Header: Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
                    {product.category}
                  </span>
                  {product.badge && (
                    <Badge variant="accent">{product.badge}</Badge>
                  )}
                </div>

                {/* Peripheral Placeholder Frame */}
                <div className="w-full h-48 rounded-xl bg-surface-2/60 border border-white/5 mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-accent/20 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                  <span className="text-[11px] font-heading font-bold text-text-muted mt-3 uppercase tracking-widest">
                    3D VIEWPORT READY
                  </span>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant={product.inStock ? "success" : "neutral"}>
                      {product.inStock ? "IN STOCK" : "RESERVE"}
                    </Badge>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-heading font-bold text-text-primary group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-heading font-semibold text-text-muted mt-1 uppercase tracking-wide">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-text-secondary mt-3 leading-relaxed font-body">
                  {product.description}
                </p>

                {/* Hardware Spec Chips */}
                <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2 rounded-md bg-surface-2/40 border border-white/5"
                    >
                      <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                        {spec.label}
                      </div>
                      <div className="text-xs font-body font-semibold text-text-primary truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted block">
                    PRICE
                  </span>
                  <span className="text-2xl font-body font-extrabold text-text-primary tracking-tight">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" title="Configure Specs">
                    <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-accent" />
                    <span>SPEC</span>
                  </Button>
                  {/* High-conversion white buy button */}
                  <Button variant="buy" size="sm" title="Add to Cart">
                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                    <span>ADD</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
