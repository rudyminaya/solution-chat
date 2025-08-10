import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Menu from "@/src/components/Menu";
import { SideBarProvider } from "@/src/context/sideBarContext";
import { ConversationProvider } from "@/src/context/conversationContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solution Chat",
  description: "Una aplicación de chat automatizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.variable} antialiased`}>
        <Menu title="Chatea con nosotros" />
        <SideBarProvider>
          <ConversationProvider>{children}</ConversationProvider>
        </SideBarProvider>
      </body>
    </html>
  );
}
