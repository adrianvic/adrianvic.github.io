module.exports = {
  eleventyComputed: {
    langKey: data => {
      const stem = data.page?.filePathStem || '';
      const parts = stem.split(require('path').sep).filter(Boolean);
      return parts.length ? parts.at(-2) : undefined;
    },
    permalink: data => `${data.langKey}/blog/${data.page.fileSlug}/`,
    layout: 'post.njk',
    title: "Adrian Victor:Blog"
  }
};
