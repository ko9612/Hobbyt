/** @type {import('next').NextConfig} */

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://59.12.62.150:8080/api/:path*",
      },
    ];
  };
  return {
    rewrites,
    eslint: {
      ignoreDuringBuilds: true //임시
    },
    typescript:{
      ignoreBuildErrors: true, //임시
    }
  };
};
