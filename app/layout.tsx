import { Analytics } from "../components/analytics";
import { MainNav } from "../components/main-nav";
import "./globals.css";

export const metadata = {
  title: "Simple IP Blocker",
  description: "Block IPs with Vercel's Edge Middleware and Edge Config",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white">
          <MainNav />
        </header>
        <div className="p-6">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
