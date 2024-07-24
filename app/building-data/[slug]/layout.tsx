import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Energenuis buildings details",
  description: "Generated by create next app",
};

export default function DataCenterDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavBar showWarningAlerts={false} />
      {children}
    </section>
  );
}
