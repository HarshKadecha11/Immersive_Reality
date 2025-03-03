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
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  return (
    <div className="w-full h-16 bg-white border-b fixed top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            Estate<span className="text-red-600">Vista</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { label: "Home", href: "/" },
            { label: "Properties", href: "/properties" },
            { label: "Map Search", href: "/map-search" },
            { label: "Sell", href: "/sell" },
            { label: "Rent", href: "/rent" },
            { label: "Mortgage", href: "/mortgage" },
            { label: "Agents", href: "/agents" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user ? (
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Login</Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Navbar;
