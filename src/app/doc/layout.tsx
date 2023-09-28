import glob from "fast-glob";

import { Providers } from "src/app/doc/providers";
import { Layout } from "src/components/Doc/Layout";

import "src/styles/tailwind.css";
import { type Metadata } from "next";
import { type Section } from "src/components/Doc/SectionProvider";
import { GridPattern } from "src/components/Doc/GridPattern";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let pages = await glob("**/*.mdx", { cwd: "src/app" });
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      "/" + filename.replace(/(^|\/)page\.mdx$/, ""),
      (await import(`./${filename}`)).sections,
    ])
  )) as Array<[string, Array<Section>]>;
  let allSections = Object.fromEntries(allSectionsEntries);

  return (
    <div lang="en" className="h-full" suppressHydrationWarning>
      <div className="flex antialiased ">
        <GridPattern
          width={72}
          height={56}
          x={-12}
          y={4}
          squares={[
            [4, 3],
            [2, 1],
            [7, 3],
            [10, 6],
          ]}
          className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:stroke-white/5"
        />
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </div>
    </div>
  );
}
