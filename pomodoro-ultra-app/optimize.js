const fs = require('fs');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');
const { minify: minifyHTML } = require('html-minifier-terser');

(async () => {
  const htmlPath = 'www/index.html';
  let html = fs.readFileSync(htmlPath, 'utf8');

  let cssChunks = [];
  html = html.replace(/<style>([\s\S]*?)<\/style>/g, (match, content) => {
    cssChunks.push(content);
    return '';
  });
  
  let jsChunks = [];
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (match, content) => {
    jsChunks.push(content);
    return '';
  });

  const rawCss = cssChunks.join('\n');
  const cssResult = new CleanCSS().minify(rawCss);
  fs.writeFileSync('www/styles.min.css', cssResult.styles);

  const rawJs = jsChunks.join('\n');
  const jsResult = await minifyJS(rawJs, { sourceMap: false });
  fs.writeFileSync('www/app.min.js', jsResult.code);

  html = html.replace('</head>', '<link rel="stylesheet" href="styles.min.css"></head>');
  html = html.replace('</body>', '<script src="app.min.js"></script></body>');

  html = html.replace('<link href="https://fonts.googleapis.com/css2', 
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2');

  const finalHtml = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    minifyJS: true,
    minifyCSS: true
  });
  
  fs.writeFileSync('www/index.html', finalHtml);
  console.log('✅ Optimization complete!');
})();
