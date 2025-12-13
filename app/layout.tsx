import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
});

// ✅ Fix: define viewport separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000319",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://omar-yassser.vercel.app"),
  title: {
    default: "Omar Yasser | Full-Stack Developer",
    template: "%s | Omar Yasser",
  },
  description:
    "Explore Omar Yasser's portfolio — a creative full-stack developer skilled in React, Next.js, Node.js, and performance optimization.",
  keywords: [
    "Omar Yasser",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Omar Yasser", url: "https://omar-yassser.vercel.app" }],
  creator: "Omar Yasser",
  publisher: "Omar Yasser",
  openGraph: {
    title: "Omar Yasser | Full-Stack Developer",
    description:
      "Creative full-stack developer specializing in modern, high-performance web apps.",
    url: "https://omar-yassser.vercel.app",
    siteName: "Omar Yasser",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/generated_image.png",
        width: 1200,
        height: 630,
        alt: "Omar Yasser Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Yasser | Full-Stack Developer",
    description:
      "Creative full-stack developer building fast and accessible web apps.",
    creator: "@OmarYasser", // Add your Twitter handle if you have one
    images: ["/generated_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://omar-yassser.vercel.app",
  },
  category: "Portfolio",
  applicationName: "Omar Yasser Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/generated_image.png"
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/generated_image.png" />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Omar Yasser",
              url: "https://omar-yassser.vercel.app",
              jobTitle: "Full-Stack Developer",
              description:
                "Creative full-stack developer skilled in React, Next.js, and Node.js.",
              sameAs: [
                "https://www.linkedin.com/in/omaryasser",
                "https://github.com/omaryasser",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
