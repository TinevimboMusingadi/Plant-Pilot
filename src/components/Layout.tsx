import React, { useState } from 'react';
import { CloudSun, Sprout, Bug, Map, Menu, X, Home, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'crops', label: 'Crop Advice', icon: Sprout },
    { id: 'pests', label: 'Pest Detector', icon: Bug },
    { id: 'seeds', label: 'Seed Bank', icon: Map },
    { id: 'ussd', label: 'USSD Demo', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-tight">Plant Pilot</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col gap-2 mt-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                    activeTab === item.id 
                      ? "bg-emerald-100 text-emerald-900 font-medium" 
                      : "hover:bg-stone-100 text-stone-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-emerald-900 text-white min-h-screen sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 flex items-center gap-3 border-b border-emerald-800">
            <Sprout className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Plant Pilot</h1>
          </div>
          <nav className="flex-1 p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                  activeTab === item.id 
                    ? "bg-emerald-800 text-white font-medium shadow-sm" 
                    : "hover:bg-emerald-800/50 text-emerald-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-emerald-800 text-xs text-emerald-400">
            <p>Plant Pilot v1.0</p>
            <p>Zimbabwe Agriculture</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
