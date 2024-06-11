import withPWA from "next-pwa";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}

export default withPWA({
  ...nextConfig,
  
  dest: "public",
  swSrc: "service-worker.js",
  // put other next-pwa options here
});
