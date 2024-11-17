"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setMounted(true);
    let lastScrollTop = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Only execute if we're not already processing a frame
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show/hide navbar based on scroll direction with a threshold
          if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past threshold
            setIsVisible(false);
          } else {
            // Scrolling up or at top
            setIsVisible(true);
          }

          setIsScrolled(currentScrollY > 10);
          lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }

      // Update active section
      // const sections = ["features", "pricing", "testimonials"];
      const sections = ["features", "pricing"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      setActiveSection(currentSection || "");
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const navElement = document.getElementById("floating-navbar");
      if (navElement) {
        const { left, top, width, height } = navElement.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    // { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 w-full z-50 flex justify-center items-center p-4",
        "transition-all duration-300 ease-in-out transform",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav
        id="floating-navbar"
        className={cn(
          "w-full max-w-7xl md:rounded-full transition-all duration-300",
          "border border-white/[0.1]",
          isScrolled
            ? "bg-background/[0.5] backdrop-blur-md"
            : "bg-background/[0.3] backdrop-blur-sm",
          mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          "group/navbar relative overflow-hidden",
        )}
      >
        {/* Enhanced Spotlight Effect */}
        <div
          className="absolute inset-0 transition duration-500 group-hover/navbar:opacity-100 opacity-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--primary-rgb), 0.15) 0%, transparent 60%)`,
            transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px)`,
          }}
        />

        {/* Content Container */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="relative group/logo">
                <Image
                  src="/lunariss.svg"
                  alt="Lunariss"
                  width={150}
                  height={150}
                  className="transition-all duration-500 transform group-hover/logo:scale-105"
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 to-transparent" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 px-4 text-sm font-medium rounded-full transition-all duration-300",
                    "group/link hover:bg-white/[0.1]",
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-foreground/90 hover:text-foreground",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                    `delay-[${(index + 1) * 100}ms]`,
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 to-transparent" />
                </Link>
              ))}

              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 transition-all duration-300 group/button"
                >
                  <Link href="/login">
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 to-transparent" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-white/[0.1]"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      isMobileMenuOpen
                        ? "rotate-180 opacity-0"
                        : "rotate-0 opacity-100",
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-180 opacity-0",
                    )}
                  >
                    <X className="h-6 w-6" />
                  </span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2 text-base font-medium rounded-lg transition-all duration-300",
                    "hover:bg-white/[0.1]",
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/90 hover:text-foreground",
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0",
                    `delay-[${(index + 1) * 100}ms]`,
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1]"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-lg bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
