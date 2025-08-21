export const envConfig = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  // api server
  baseApi: process.env.NEXT_PUBLIC_API,
  testApi: process.env.NEXT_PUBLIC_TEST_API,
  serverDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
  // site url
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
  testUrl: process.env.NEXT_PUBLIC_TEST_SITE_URL,
};
