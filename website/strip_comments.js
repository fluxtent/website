const fs = require('fs');
const path = require('path');

// Target files
const files = [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'style.css')
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    if (file.endsWith('.html')) {
        // 1. Remove standard HTML comments like <!-- ... -->
        content = content.replace(/<!--[\s\S]*?-->/g, '');

        // 2. Remove known inline JS comments we added in scripts
        content = content.replace(/[ \t]*\/\/ Calculate center relative to container\r?\n/g, '');
        content = content.replace(/[ \t]*\/\/ Smooth vertical Bezier\r?\n/g, '');
        content = content.replace(/[ \t]*\/\/ Scroll Deck SVG Animation\r?\n/g, '');
        content = content.replace(/[ \t]*\/\/ Calculate scroll progress\r?\n/g, '');
        content = content.replace(/[ \t]*\/\/ Active state for markers\r?\n/g, '');
    } else if (file.endsWith('.css')) {
        // Remove CSS comments like /* ... */
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    // Clean up excessive blank lines formed by removed comments
    content = content.replace(/\n[ \t]*\n[ \t]*\n/g, '\n\n');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Removed comments from ${path.basename(file)}`);
    }
});
