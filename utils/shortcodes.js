
const fs = require('fs');
const path = require('path');
const cwd = path.resolve('static/icons');

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

  // tip: function(content) {
  //   return `<div class="tip py-2 px-4 bg-yellow-100 border rounded border-yellow-300">${ shortcodes.icon('tip') } ${ content }</div>`;
  // }
};

const pairedshortcodes = {
  tip: function(content) {
    return `<div class="tip flex items-center py-2 bg-yellow-100 border rounded border-yellow-300">${ shortcodes.icon('tip') }<div>${ content }</div></div>`;
  }
};

module.exports = { shortcodes, pairedshortcodes };