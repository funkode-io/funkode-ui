module.exports = function(eleventyConfig) {
  // Pass through copy for CSS files
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Return your object options
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
