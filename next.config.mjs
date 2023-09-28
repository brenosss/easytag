// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import nextMDX from '@next/mdx'
import { recmaPlugins } from './src/mdx/recma.mjs';
import { rehypePlugins } from './src/mdx/rehype.mjs';
import { remarkPlugins } from './src/mdx/remark.mjs';
import withSearch from './src/mdx/search.mjs'

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental:{
    mdxRs:true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};
export default withSearch(withMDX(nextConfig));
