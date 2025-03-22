import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Home, Menu, User, LogOut, HelpCircle, LayoutDashboard } from "lucide-react";
import authService from '../../../services/authService';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminInfo = localStorage.getItem('adminInfo');
    
    if (!adminInfo) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(adminInfo));
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="container flex h-16 items-center px-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 sm:w-72">
                  <div className="flex flex-col gap-4 py-4">
                    <div className="text-lg font-bold">Admin Dashboard</div>
                    <nav className="flex flex-col gap-2">
                      <Link to="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="mr-2 h-5 w-5" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link to="/admin/faqs">
                        <Button variant="ghost" className="w-full justify-start">
                          <HelpCircle className="mr-2 h-5 w-5" />
                          FAQ Management
                        </Button>
                      </Link>
                      {/* Add more navigation links as needed */}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Logo */}
              <Link to="/admin/dashboard" className="hidden md:flex items-center gap-2">
                <Home className="h-6 w-6" />
                <span className="font-bold">Gewal.lk Admin</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/admin/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/admin/faqs">
                <Button variant="ghost">FAQ Management</Button>
              </Link>
              {/* Add more navigation links as needed */}
            </nav>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {admin && (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <p>{admin.name}</p>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6 px-4 md:px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Gewal.lk - Admin Panel</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;