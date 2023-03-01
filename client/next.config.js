/** @type {import('next').NextConfig} */

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://hobbyt.saintho.dev/api/:path*",
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
