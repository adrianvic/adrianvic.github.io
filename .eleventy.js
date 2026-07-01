const fs = require("fs");
const path = require("path");
const i18n = require('./_data/i18n.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*").sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("misc", (api) =>
    api.getFilteredByTag("misc")
  );
  eleventyConfig.addFilter("getTranslation", (page, lang) => {
    const dir = path.dirname(page.inputPath);
    const file = path.join(dir, `${lang}.json`);
    
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
  
    return {};
  });
  eleventyConfig.addCollection("88x31", () => {
    return fs.readdirSync("static/images/88x31")
    .map(file => ({
      url: `/static/images/88x31/${file}`,
      fileSlug: file
    }));
  });

  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addNunjucksFilter("alternateLanguages", function(collection, postId, currentLanguageKey) {
    return collection.filter(post => 
      post.data.postId === postId && post.data.langKey !== currentLanguageKey
    )
    .map(post => ({
      lang: post.data.langKey,
      url: post.url,
      title: post.data.title
    }))
  });

    eleventyConfig.addFilter("absoluteUrl", function(url) {
    const base = "https://adrianvic.github.io";
    const prefix = process.env.GITHUB_ACTIONS ? "" : "/tenkuma/web";
    return base + prefix + url;
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    if (!dateObj) return "";
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "America/Sao_Paulo"
    });
  });

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
    pathPrefix: process.env.GITHUB_ACTIONS ? "" : "/tenkuma/web",
    dir: {
      output: "docs"
    }
  };
};
