
const fs = require('fs');
const path = require('path');
const cwd = path.resolve('static/icons');

module.exports = {
  // icon: function (name) {
  //   return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
  //         <use xlink:href="#icon-${name}"></use>
  //       </svg>`
  // }
  icon: function(file) {
    const icon = path.join(cwd, `${file}.svg`);
    const data = fs.readFileSync(icon, { encoding:'utf8', flag:'r' });

    return data.replace(/<svg /, '<svg class="icon" ');
  }
}