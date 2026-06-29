import { LogOut, Menu, User } from "lucide-react";
import { Link, NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/assets/icons/Logo";
import { ModeToggle } from "./ModeToggler";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          <Logo />
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
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {data?.data?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="rounded-full outline-none ring-offset-background transition hover:ring-2 hover:ring-primary">
                    <Avatar className="h-10 w-10 cursor-pointer border">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {data.data.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              ></DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 p-0 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {data.data.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {data.data.name || "User"}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {data.data.email}
                    </p>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-1">
                  <DropdownMenuItem className="cursor-pointer rounded-md">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                    className="cursor-pointer rounded-md"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            {/* Use asChild to avoid nested <button> elements */}
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] p-0">
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex h-full flex-col justify-between">
                {/* Navigation */}
                <nav className="flex flex-col px-3 py-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-3 text-base transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                {/* Bottom Section */}
                <div className="border-t p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>

                  {data?.data?.email ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {data.data.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {data.data.name || "User"}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {data.data.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full">
                      <Link to="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
