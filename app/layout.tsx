import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "Adrián Cando Oviedo · Documentum Senior Consultant",
    description:
      "Portfolio profesional de Adrián Cando Oviedo, consultor senior especializado en OpenText Documentum, Java, DFCs, migraciones ECM y automatización.",
    keywords: [
      "Adrián Cando Oviedo",
      "Documentum Senior Consultant",
      "OpenText Documentum",
      "Java DFC",
      "Consultoría ECM",
      "Migraciones Documentum",
    ],
    authors: [{ name: "Adrián Cando Oviedo" }],
    openGraph: {
      title: "Adrián Cando Oviedo · Documentum Senior Consultant",
      description:
        "Tecnología documental con visión de negocio. Consultoría, migraciones y desarrollo sobre OpenText Documentum.",
      type: "website",
      locale: "es_ES",
      images: [
        {
          url: ogImage,
          width: 1734,
          height: 907,
          alt: "Adrián Cando Oviedo · Documentum Senior Consultant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Adrián Cando Oviedo · Documentum Senior Consultant",
      description:
        "Consultoría, migraciones y desarrollo sobre OpenText Documentum.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
