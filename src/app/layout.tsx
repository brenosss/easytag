import "../styles/globals.css";
import type { Metadata } from 'next'
import { headers } from "next/headers";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html>
      <body className="bg-slate-100">
        {children}
      </body>
    </html>

  );
}

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const tags = await fetch(`http://localhost:8080/pages/snippet`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1T9660AVNG8PK7ZLJCRNHB"
      },
      body: JSON.stringify({
        "path": pathname,
        "type": "nextApp"
      })
    }
  ).then((res) => res.json()
  ).catch(() => {
    return {
      title: "Create beautiful social media previews",
      description: "It's never been easier to create beautiful social media previews for your website. Just create the page and we'll creaete your tags for you.",
    }
  })
  return tags
}