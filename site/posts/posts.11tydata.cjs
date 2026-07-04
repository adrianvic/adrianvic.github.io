let data = {
	layout: "_includes/post.njk",
	eleventyComputed: {
		lastModified: function(data) {
			const fs = require('fs');
			const stats = fs.statSync(data.page.inputPath);
			return stats.mtime;
		}
	}
};

module.exports = data;
