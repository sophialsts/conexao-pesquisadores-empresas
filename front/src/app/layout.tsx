import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { AppPageHeader } from "@/components/Header";

const lexendSans = Lexend(
  {
    weight: ["400", "500", "700", "900"],
    variable: "--font-lexend-sans",
    subsets: ["latin"]
  }
)


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simcc | Conexão Pesquisadores-Empresas",
  description: "Conectando Pesquisadores e Empresas",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexendSans.variable}  ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SidebarProvider>
          <AppSidebar/>
          <SidebarInset>
            <div className="w-full pb-8 px-4">
              <AppPageHeader/>
              <main>
                {children}
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
