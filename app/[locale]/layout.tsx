import type { Metadata } from "next";
import { Poppins, Inter, Open_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import WhatsappButton from "@/components/atoms/WhatsAppButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Al-Jabbar House of Carpets - Luxury Carpets & Premium Rugs for Your Home",
  description:
    "Al-Jabbar House of Carpets offers luxury carpets and premium rugs crafted for timeless comfort and style. Browse our collections or contact us for personalised consultation.",
  openGraph: {
    title:
      "Al-Jabbar House of Carpets - Luxury Carpets & Premium Rugs for Your Home",
    description:
      "Al-Jabbar House of Carpets offers luxury carpets and premium rugs crafted for timeless comfort and style.",
    images: "/thumbnails.webp",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Al-Jabbar House of Carpets - Luxury Carpets & Premium Rugs for Your Home",
    description:
      "Al-Jabbar House of Carpets offers luxury carpets and premium rugs crafted for timeless comfort and style.",
    images: "/thumbnails.webp",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} ${inter.variable} ${open_sans.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Navbar />
          <WhatsappButton />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
