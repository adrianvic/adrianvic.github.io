document.addEventListener('DOMContentLoaded', () => {
    fetch('./assets/quotes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load the quotes file.');
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            const textLines = [];
            const authorLines = [];

            lines.forEach(line => {
                if (line.trim().startsWith('!')) {
                    textLines.push(line.trim());
                } else if (line.trim().startsWith('@')) {
                    authorLines.push(line.trim());
                }
            });

            // Ensure that textLines and authorLines have the same length
            const minLength = Math.min(textLines.length, authorLines.length);

            if (minLength === 0) {
                throw new Error('No matching text and author lines found.');
            }

            const randomIndex = Math.floor(Math.random() * minLength);
            const randomTextLine = textLines[randomIndex];
            const randomAuthorLine = authorLines[randomIndex];

            document.getElementById('random-quote').textContent = randomTextLine.substring(1); // Remove '!' from the text
            document.getElementById('random-quote-author').textContent = randomAuthorLine.substring(1); // Remove '@' from the author
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
