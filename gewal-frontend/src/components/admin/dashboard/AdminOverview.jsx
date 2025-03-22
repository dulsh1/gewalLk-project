import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Users, Home as HomeIcon, HelpCircle, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    faqs: 0
  });

  // This would normally fetch real data from your API
  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setStats({
        users: 158,
        properties: 432,
        faqs: 24
      });
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* User Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        
        {/* Property Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.properties}</div>
            <p className="text-xs text-muted-foreground">Listed properties</p>
          </CardContent>
        </Card>
        
        {/* FAQ Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faqs}</div>
            <p className="text-xs text-muted-foreground">Published FAQs</p>
          </CardContent>
        </Card>
        
        {/* Visitors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Traffic</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">Monthly visitors</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your website content</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link to="/admin/dashboard/faqs">
              <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Manage FAQs</span>
              </div>
            </Link>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Manage Properties</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Users</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe created an account</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">New property listed</p>
                  <p className="text-sm text-gray-500">Luxury Villa in Colombo 7</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">FAQ updated</p>
                  <p className="text-sm text-gray-500">Changed answer to "How to list a property"</p>
                  <p className="text-xs text-gray-400">Yesterday</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;