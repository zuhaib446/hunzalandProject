"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && pathname === "/admin/login") {
      router.push("/admin");
    } else if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {session ? (
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-20 left-4 z-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={cn(
              "w-64 bg-card border-r fixed lg:static left-0 top-16 h-[calc(100vh-4rem)] z-40 transform transition-transform duration-200 ease-in-out",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
          >
            <nav className="p-4">
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
              <ul className="space-y-2">
                {[
                  { href: "/admin/properties", label: "Properties" },
                  { href: "/admin/cars", label: "Rent a Car" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="block px-4 py-2 rounded-md hover:bg-accent"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-auto">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
