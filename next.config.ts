import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/** @type {import('@next/mdx').MDXOptions} */
const mdxOptions = {
  extension: /\.mdx?$/,
};

const withMDX = createMDX(mdxOptions);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["api.mirtraveler.ru"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: true,
    mdxRs: false,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default withMDX(nextConfig);
