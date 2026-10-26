import { Inter, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicOnly from "@/components/PublicOnly";
import { siteConfig } from "@/config/SiteConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.name} — Learn Skills. Build Your Future.`,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className={`${poppins.className} min-h-full min-w-0 flex flex-col bg-white text-[#0F172A]`}>
        <PublicOnly>
          <Header />
        </PublicOnly>
        <div className="min-w-0 flex-grow">{children}</div>
        <PublicOnly>
          <Footer />
        </PublicOnly>
      </body>
    </html>
  );
}
