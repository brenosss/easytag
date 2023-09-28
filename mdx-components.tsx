import * as mdxComponents from "src/components/Doc/mdx";
import { type MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    ...mdxComponents,
  };
}
