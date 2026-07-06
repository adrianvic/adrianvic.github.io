import fs from "fs";
import path from "path";

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import safeLinks from "@sardine/eleventy-plugin-external-links";
import pluginGitCommitDate from "eleventy-plugin-git-commit-date";
import recentChanges from "eleventy-plugin-recent-changes";
// import Webmentions from "eleventy-plugin-webmentions"; // configure later
import pluginInlineLinkFavicon from "eleventy-plugin-inline-link-favicon";
import poison from "eleventy-plugin-poison";
import mastoarchive from "eleventy-plugin-mastoarchive";
// import purgeCssPlugin from "eleventy-plugin-purgecss";
import pluginCleanUrls from "@inframanufaktur/eleventy-plugin-clean-urls";
// import githubRepos from 'eleventy-plugin-github-repos';
import readingTime from 'eleventy-plugin-reading-time';

// import i18n from "./_data/i18n.js";

const production = (process.env.GITHUB_ACTIONS || process.env.FORGEJO_ACTIONS || process.env.IS_PRODUCTION);
console.log("Production:", production ? "true" : "false");

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("site");

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(safeLinks);
  eleventyConfig.addPlugin(pluginGitCommitDate);
  eleventyConfig.addPlugin(recentChanges, {
    commits: 10,
  });
  eleventyConfig.addPlugin(pluginInlineLinkFavicon);
  eleventyConfig.addPlugin(poison);
  eleventyConfig.addPlugin(mastoarchive, {
    host: "https://mstdn.social",
    userId: "114661188739031987",
    cacheLocation: ".cache/mastodon.json",
    isProduction: production
  });
  // eleventyConfig.addPlugin(purgeCssPlugin, {
  //   config: "./purgecss.config.cjs",
  //   quiet: false,
  // });
  eleventyConfig.addPlugin(pluginCleanUrls);
  // eleventyConfig.addPlugin(githubRepos, { userAccount: 'adrianvic' });
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addWatchTarget("./site");


  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./site/posts/*")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("misc", (api) => api.getFilteredByTag("misc"));

  eleventyConfig.addFilter("getTranslation", (page, lang) => {
    const dir = path.dirname(page.inputPath);
    const file = path.join(dir, `${lang}.json`);

    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8"));
    }

    return {};
  });

  eleventyConfig.addCollection("88x31", () => {
    return fs
      .readdirSync("static/images/88x31")
      .map((file) => ({
        url: `/static/images/88x31/${file}`,
        fileSlug: file,
      }));
  });

  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addNunjucksFilter(
    "alternateLanguages",
    function (collection, postId, currentLanguageKey) {
      return collection
        .filter(
          (post) =>
            post.data.postId === postId &&
            post.data.langKey !== currentLanguageKey
        )
        .map((post) => ({
          lang: post.data.langKey,
          url: post.url,
          title: post.data.title,
        }));
    }
  );

  eleventyConfig.addFilter("absoluteUrl", function (url) {
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
      timeZone: "America/Sao_Paulo",
    });
  });

  eleventyConfig.addNunjucksFilter("smartTitle", function (str) {
    if (!str) return "";
    const smallWords = [
      "a",
      "an",
      "and",
      "at",
      "but",
      "by",
      "for",
      "in",
      "nor",
      "of",
      "on",
      "or",
      "so",
      "the",
      "to",
      "up",
      "yet",
      "e",
      "de",
      "do",
      "da",
      "dos",
      "das",
      "a",
      "o",
      "um",
      "uma",
      "em",
      "por",
      "para",
      "com",
      "no",
      "na",
      "nos",
    ];

    return str
      .toLowerCase()
      .split(" ")
      .map((word, i) => {
        if (i === 0) return word.charAt(0).toUpperCase() + word.slice(1);
        return smallWords.includes(word)
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  });

  return {
    pathPrefix: process.env.GITHUB_ACTIONS ? "" : "/tenkuma/web",
    dir: {
      output: "docs",
    },
  };
}
