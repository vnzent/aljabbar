import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aljabbarcarpets.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
