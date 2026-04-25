import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zombies vs Robots",
  description: "Gestor de personajes y simulador de batallas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
