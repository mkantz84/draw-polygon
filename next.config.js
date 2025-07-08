module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // allow all paths under picsum.photos
      },
    ],
  },
};
