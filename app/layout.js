import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/lib/AuthContext";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import Navbar from "./components/Navbar.js";   // Import Navbar
import Footer from "./components/Footer";   // Import Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frontend Laboratory App",
  description: "Projekt na laboratoria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="flex min-h-screen bg-gray-100">
            {/* Pasek boczny */}
            <Sidebar />

            {/* Główna część strony */}
            <div className="flex-1 flex flex-col">
              <Navbar />
              
              <main className="flex-1 p-6">
                {children}
              </main>

              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}