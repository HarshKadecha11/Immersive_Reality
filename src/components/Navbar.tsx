import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

const Navbar = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  const mainNavItems = [
    { label: "Home", href: "/" },
    {
      label: "Properties",
      href: "/properties",
      dropdown: [
        { label: "Buy", href: "/properties?type=buy" },
        { label: "Rent", href: "/properties?type=rent" },
        { label: "Commercial", href: "/properties?type=commercial" },
      ],
    },
    { label: "Map Search", href: "/map-search" },
    { label: "Find Agents", href: "/agents" },
  ];

  const secondaryNavItems = [
    { label: "VR Tours", href: "/vr-tours" },
    { label: "Blog", href: "/blog" },
    { label: "Mortgage", href: "/mortgage" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full h-16 bg-white border-b fixed top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="text-xl font-bold">
            Estate<span className="text-green-600">Vista</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex space-x-1 mr-4">
            {mainNavItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative group px-3">
                  <a
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors flex items-center gap-1 py-2"
                  >
                    {item.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </a>
                  <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors px-3 py-2"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          <div className="h-6 border-l border-gray-300 mx-2"></div>

          <div className="flex space-x-1">
            {secondaryNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors px-3 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <span className="mr-1">+</span> Post Property
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={user.email || "User"} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/profile")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/settings")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => setShowAuthModal(true)}>
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {[...mainNavItems, ...secondaryNavItems].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-green-600 py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-2" size="sm">
              <span className="mr-2">+</span> Post Property
            </Button>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Navbar;
