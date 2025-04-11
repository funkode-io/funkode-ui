module.exports = function(eleventyConfig) {
  // Pass through copy for CSS files
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Pass through copy for components
  eleventyConfig.addPassthroughCopy("src/components");
  
  // Return your object options
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
