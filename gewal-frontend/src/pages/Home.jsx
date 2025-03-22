import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/home/FAQSection';
import { Button } from '../components/ui/button';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user, userType, logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl text-blue-600">Gewal.lk</Link>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Home</Link>
              <Link to="#properties" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Properties</Link>
              <Link to="#faqs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">FAQs</Link>
              <Link to="#contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <span className="text-sm mr-2">Welcome, {user?.name}</span>
                  <Link to={userType === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Discover the perfect property with Gewal.lk - Sri Lanka's premier real estate platform.</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">Browse Properties</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">List Your Property</Button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would be populated with property cards */}
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Modern Apartment</h3>
                <p className="text-gray-600">Colombo 5, Sri Lanka</p>
                <p className="text-blue-600 font-bold mt-2">Rs. 25,000,000</p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Luxury Villa</h3>
                <p className="text-gray-600">Negombo, Sri Lanka</p>
                <p className="text-blue-600 font-bold mt-2">Rs. 45,000,000</p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Commercial Space</h3>
                <p className="text-gray-600">Galle, Sri Lanka</p>
                <p className="text-blue-600 font-bold mt-2">Rs. 35,000,000</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button>View All Properties</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      rows="4" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Gewal.lk</h3>
              <p className="text-gray-400">Your trusted real estate partner in Sri Lanka since 2023.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="#properties" className="hover:text-white">Properties</Link></li>
                <li><Link to="#faqs" className="hover:text-white">FAQs</Link></li>
                <li><Link to="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Property Types</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Apartments</a></li>
                <li><a href="#" className="hover:text-white">Houses</a></li>
                <li><a href="#" className="hover:text-white">Commercial</a></li>
                <li><a href="#" className="hover:text-white">Land</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <address className="not-italic text-gray-400">
                <p>123 Main Street</p>
                <p>Colombo, Sri Lanka</p>
                <p className="mt-2">info@gewal.lk</p>
                <p>+94 11 123 4567</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Gewal.lk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;