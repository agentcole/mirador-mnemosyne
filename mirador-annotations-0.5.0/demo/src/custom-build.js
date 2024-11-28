const fs = require('fs');
const path = require('path');

// Get environment variables or use defaults
const API_URL = process.env.API_URL || 'http://localhost:3000';
const TITLE = process.env.TITLE || 'Mirador Mnemosyne';

// Path to the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');

// Read the HTML file
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Replace title and add API_URL to demo div
htmlContent = htmlContent
    .replace(/<title>.*?<\/title>/, `<title>${TITLE}</title>`)
    .replace(
        /<div id="demo"><\/div>/,
        `<div id="demo" data-mirador-collection-api="${API_URL}"></div>`
    );

// Write back the modified HTML
fs.writeFileSync(indexPath, htmlContent);

console.log(`Built with:
- API_URL: ${API_URL}
- Title: ${TITLE}
`);