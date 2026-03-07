import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import ClientToaster from "@/components/ClientToaster";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "UniTrade — Your Chai-Themed Marketplace",
  description: "A warm, inviting marketplace powered by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${outfit.variable} font-[family-name:var(--font-outfit)] antialiased bg-cream text-chai-900`}
      >
        <ClerkProvider>
          <ClientToaster />
          <AppContextProvider>{children}</AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}


