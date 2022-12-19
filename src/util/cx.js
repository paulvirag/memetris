'use strict';

function cx(obj) {
  return Object.keys(obj)
    .filter(key => obj[key])
    .join(' ');
}

export default cx;
