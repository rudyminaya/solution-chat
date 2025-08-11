import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Menu from "@/src/components/Menu";
import { SideBarProvider } from "@/src/context/sideBarContext";
import { MSWProvider } from "./msw-provider";
import { ConversationProvider } from "@/src/context/conversationContext";

if (process.env.NEXT_RUNTIME === "nodejs") {
  const { server } = require("@/src/mocks/node");
  server.listen();
}

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
        <MSWProvider>
          <ConversationProvider>
            <Menu title="Chatea con nosotros" />
            <SideBarProvider>{children}</SideBarProvider>
          </ConversationProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
