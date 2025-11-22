elasticlunr = require('elasticlunr');
fs = require('fs');

let allPosts = [];

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("post", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("./blog/**/*").sort((a, b) => b.date - a.date)
    allPosts = posts;
    return posts;
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
    
    eleventyConfig.on('afterBuild', () => {
      const idx = elasticlunr(function () {
        this.setRef('url');
        this.addField('title', { boost: 2 });
        this.addField('tags')
        
        allPosts.forEach(item => {
          const doc = {
            url: item.url || item.outputPath || item.data.permalink || item.filePathStem,
            title: item.data.postTitle || '',
            tags: item.data.tags || [],
          };
          this.addDoc(doc);
        });
        
      });
      
      fs.writeFileSync('./docs/search_index.json', JSON.stringify(idx));
    });
    
    return {
      dir: {
        output: "docs"
      }
    };
  }