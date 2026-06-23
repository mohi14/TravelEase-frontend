import { Menu } from "lucide-react";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/assets/icons/Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          <Logo/>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button>Login</Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 transition-colors ${
                        isActive
                          ? "bg-muted font-semibold"
                          : "hover:bg-muted"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <Button className="mt-4 w-full">
                  Download CV
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}