"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, User, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  // Demo cart count for visual validation
  const cartItemCount = 2;

  return (
    <header className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
      <nav
        aria-label="Main Navigation"
        className="px-5 md:px-7 py-3.5 bg-[rgba(15,15,35,0.85)] backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-1 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="font-heading font-black text-sm tracking-tighter">CG</span>
          </div>
          <span className="font-heading font-extrabold text-lg md:text-xl tracking-wider text-text-primary">
            CLUTCH<span className="text-cyan-500">GEAR</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#featured"
            className="flex items-center gap-2 text-sm font-body font-medium text-text-secondary hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop</span>
          </Link>

          <Link
            href="#cart"
            className="flex items-center gap-2 text-sm font-body font-medium text-text-secondary hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            <span className="px-2 py-0.5 text-[11px] font-heading font-bold rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              {cartItemCount}
            </span>
          </Link>

          <Link
            href="#login"
            className="flex items-center gap-2 text-sm font-body font-medium text-text-secondary hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="#featured"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-surface-1 text-xs font-heading font-bold text-text-primary border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer"
          >
            CONFIGURE GEAR
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface-1 border border-white/10 text-text-secondary hover:text-cyan-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-[rgba(15,15,35,0.95)] backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href="#featured"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:bg-surface-1 hover:text-cyan-400 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="font-heading font-semibold text-sm">Shop All Peripherals</span>
          </Link>

          <Link
            href="#cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-lg text-text-primary hover:bg-surface-1 hover:text-cyan-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span className="font-heading font-semibold text-sm">Cart</span>
            </div>
            <span className="px-2 py-0.5 text-xs font-heading font-bold rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              {cartItemCount} items
            </span>
          </Link>

          <Link
            href="#login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:bg-surface-1 hover:text-cyan-400 transition-colors"
          >
            <User className="w-4 h-4 text-cyan-400" />
            <span className="font-heading font-semibold text-sm">Sign In / Account</span>
          </Link>
        </div>
      )}
    </header>
  );
}
