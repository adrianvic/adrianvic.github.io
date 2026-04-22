const fs = require("fs");
const path = require("path");

module.exports = {
    eleventyComputed: {
        t: (data) => {
            const dir = path.dirname(data.page.inputPath);
            
            const file = path.join(dir, `${data.langKey}.json`);
            if (fs.existsSync(file)) {
                return JSON.parse(fs.readFileSync(file, "utf-8"));
            }
            
            return {};
        },
        c: (data) => {
            const dir = path.dirname(data.page.inputPath);
            
            const file = path.join(dir, `common.json`);
            if (fs.existsSync(file)) {
                return JSON.parse(fs.readFileSync(file, "utf-8"));
            }
            
            return {};
        }
    },
    
    
    permalink: data => {
        return `/${data.langKey}/misc/${data.page.fileSlug}/`;
    },
    tags: "misc"
};