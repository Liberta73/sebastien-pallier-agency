/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/zoe",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://airtable.com https://*.airtable.com https://airtableusercontent.com https://*.airtableusercontent.com",
          },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
