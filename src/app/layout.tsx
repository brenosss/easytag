import "../styles/globals.css";
import { Metadata, ResolvingMetadata } from 'next'


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
  const tags = await fetch(`http://localhost:8080/pages/snippet`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1T9660AVNG8PK7ZLJCRNHB"
      },
      body: JSON.stringify({
        "path": "Test",
        "type": "nextApp"
      })
    }
  ).then((res) => res.json())
  return tags
}