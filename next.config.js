/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'https://austinhowardapi.azurewebsites.net/api/v1',
    // ENV: process.env.ENV,
    ENV: 'production',
  },

  //Redirect / to /dash
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
