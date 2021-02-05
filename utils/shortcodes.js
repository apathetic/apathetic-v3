
const fs = require('fs');
const path = require('path');
const cwd = path.resolve('static/icons');
const markdownIt = require('markdown-it')();

const shortcodes = {
  // icon: function (name) {
  //   return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
  //         <use xlink:href="#icon-${name}"></use>
  //       </svg>`
  // }
  icon: function(file) {
    const icon = path.join(cwd, `${file}.svg`);
    const data = fs.readFileSync(icon, { encoding:'utf8', flag:'r' });

    return data.replace(/<svg /, '<svg class="icon" ');
  },

  tags: function(tags) {
        // ${ tags.map(t => `<a href="/tags/${t}/"><span class="">${t}</span></a>`) }
    return `
      <div class="hidden">
        ${ tags.map(t => `<span class="bg-gray-900 text-gray-50 text-sm">${t}</span>`) }
      </div>`;
  }
};

const pairedshortcodes = {
  note: function(content) {
    content = markdownIt.render(content);
    return `<div class="note callout py-2 bg-blue-100 rounded"><strong class="block">Note</strong>${ content }</div>`;
  },

  tip: function(content) {
    // content = markdownIt.render(content);
    return `<div class="tip callout py-2 bg-yellow-100 rounded"><strong class="block">Tip</strong>${ content }</div>`;
  }
};

module.exports = { shortcodes, pairedshortcodes };