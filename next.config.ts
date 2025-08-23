// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   output: "standalone",
// //   images: {
// //     domains: ["api.mirtraveler.ru"],
// //   },
// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },
// //   typescript: {
// //     ignoreBuildErrors: true,
// //   },
// //   experimental: {
// //     esmExternals: true,
// //   },
// // };

// // export default nextConfig;

// import type { NextConfig } from "next";
// import createMDX from "@next/mdx";

// /** @type {import('@next/mdx').MDXOptions} */
// const mdxOptions = {
//   extension: /\.mdx?$/,
//   options: {},
// };

// const withMDX = createMDX(mdxOptions);

// const nextConfig: NextConfig = {
//   output: "standalone",
//   images: {
//     domains: ["api.mirtraveler.ru"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   experimental: {
//     esmExternals: true,
//     mdxRs: true,
//   },
//   pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
// };

// export default withMDX(nextConfig);

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
    mdxRs: false, // ← ОТКЛЮЧИТЕ experimental.mdxRs
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// ОБЯЗАТЕЛЬНО оберните конфиг
export default withMDX(nextConfig);
