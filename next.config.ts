import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "joystick.evyx.lol"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
