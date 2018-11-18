var result = {};
var arr = [];
var i,key;
function scanDOM (node) {
  var child = node.firstChild
  var classList = node.classList
  if (classList && classList.length) {
    for (i = 0; i < classList.length; i++) {
      if (result[classList[i]] !== undefined) {
        result[classList[i]]++;
      } else { result[classList[i]] = 1; }
    }
  }
  while (child) {
    if (child.nodeType == 1 || child.nodeType == 3) {
      if (result[child.nodeName] !== undefined) {
        result[child.nodeName]++
      } else { result[child.nodeName] = 1; }
      scanDOM(child);
    }
    child = child.nextSibling;
  }
};
scanDOM(document.body);
console.log(result);
