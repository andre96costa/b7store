import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "B7Store",
  description: "Webstore of b7web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
