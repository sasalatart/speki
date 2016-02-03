var head = document.getElementsByTagName('head')[0];

var semanticUICSS = document.createElement('link');
semanticUICSS.type = 'text/css';
semanticUICSS.rel = 'stylesheet';
semanticUICSS.href = '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css';

var semanticUIJS = document.createElement('script');
semanticUIJS.type = 'text/javascript';
semanticUIJS.src = '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js';

head.appendChild(semanticUICSS);
head.appendChild(semanticUIJS);
