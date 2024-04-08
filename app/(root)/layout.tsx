import { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Let's Talk",
  description: "Video call app",
  icons: {
    icon: "/icons/logo-letstalk.svg",
  },
};


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
