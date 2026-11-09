// src/platforms.js

const platforms = {
  twitter: {
    name: "Twitter (X)",
    limit: 280,
    imageRequired: false,
    maxHashtags: Infinity,
    color: "#1DA1F2",
  },

  facebook: {
    name: "Facebook",
    limit: 63206,
    imageRequired: false,
    maxHashtags: Infinity,
    color: "#1877F2",
  },

  instagram: {
    name: "Instagram",
    limit: 2200,
    imageRequired: true,
    maxHashtags: 30,
    color: "#E1306C",
  },

  linkedin: {
    name: "LinkedIn",
    limit: 3000,
    imageRequired: false,
    maxHashtags: 10,
    color: "#0077B5",
  },
};

export default platforms;