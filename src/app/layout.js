import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-200 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}