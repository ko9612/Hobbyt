/** @type {import('next').NextConfig} */

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};