import Link from "next/link";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
];

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col items-center justify-center space-y-6">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Lunaris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
