'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Image as ImageIcon, GraduationCap, LogOut, Loader2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
        } else {
          setUser(session.user);
          if (pathname === '/admin/login') {
            router.push('/admin/portfolio');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b1a] flex items-center justify-center">
        <Loader2 className="text-gold animate-spin" size={40} />
      </div>
    );
  }

  // If on login page, render without sidebar but keep structure stable
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#050b1a]">{children}</div>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
    { name: 'Masterclass', href: '/admin/masterclass', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-[#050b1a] flex flex-col md:flex-row">
      <Toaster position="top-right" />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-navy/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-50">
        <span className="font-display text-gold tracking-widest uppercase font-bold text-sm">Nizan Admin</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-0 z-40 bg-navy border-r border-white/10 w-64 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-8 h-full flex flex-col">
          <div className="mb-12 hidden md:block">
            <h1 className="font-display text-lg text-white font-light tracking-[0.2em] uppercase">
              Nizan<span className="text-gold font-bold">Admin</span>
            </h1>
          </div>

          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all
                    ${isActive ? 'bg-gold text-navy' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 mb-6 px-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-[10px] font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-white/40 text-[8px] tracking-widest uppercase truncate">Signed in as</p>
                <p className="text-white text-[10px] truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 text-xs font-bold tracking-[0.2em] uppercase text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
