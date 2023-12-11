import "../styles/globals.css";
import type { Metadata } from 'next'
import { headers } from "next/headers";
import { env } from "src/env/server.mjs";
import Script from 'next/script'
import * as gtag from "src/gtag"


function GoogleAnalytics() {
  return (
    <>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  });
                `,
            }}
        />
    </>
)
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html>
      <GoogleAnalytics/>
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
  const tags = await fetch(`${env.API_URL}/pages/snippet`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.API_KEY}`
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