module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*").sort((a, b) => b.date - a.date);
  });

eleventyConfig.addPassthroughCopy("static");

eleventyConfig.addNunjucksFilter("smartTitle", function(str) {
  if (!str) return "";
  const smallWords = ["a","an","and","at","but","by","for","in","nor","of","on","or","so","the","to","up","yet",
    "e","de","do","da","dos","das","a","o","um","uma","em","por","para","com","no","na","nos"];
    return str.toLowerCase().split(" ").map((word, i) => {
      if (i === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return smallWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  });
    return {
    dir: {
      output: "docs"
    }
  };
}