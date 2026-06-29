import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Campus Compass",
  description: "Navigate. Organize. Thrive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar — visible on desktop only */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 md:ml-60 min-h-screen pb-24 md:pb-0"
            style={{ backgroundColor: "#F5F8F4" }}>
            <div className="max-w-5xl mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>

        {/* Bottom nav — visible on mobile only */}
        <BottomNav />
      </body>
    </html>
  );
}