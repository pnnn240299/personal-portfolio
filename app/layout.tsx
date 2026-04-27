import type { Metadata } from "next"
import "../src/index.css"

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "A modern portfolio website with admin panel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
