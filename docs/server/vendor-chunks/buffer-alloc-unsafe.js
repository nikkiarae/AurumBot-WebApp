/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/buffer-alloc-unsafe";
exports.ids = ["vendor-chunks/buffer-alloc-unsafe"];
exports.modules = {

/***/ "(rsc)/./node_modules/buffer-alloc-unsafe/index.js":
/*!***************************************************!*\
  !*** ./node_modules/buffer-alloc-unsafe/index.js ***!
  \***************************************************/
/***/ ((module) => {

eval("function allocUnsafe (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('\"size\" argument must be a number')\n  }\n\n  if (size < 0) {\n    throw new RangeError('\"size\" argument must not be negative')\n  }\n\n  if (Buffer.allocUnsafe) {\n    return Buffer.allocUnsafe(size)\n  } else {\n    return new Buffer(size)\n  }\n}\n\nmodule.exports = allocUnsafe\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvYnVmZmVyLWFsbG9jLXVuc2FmZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtraXJhZS9EZXNrdG9wL0F1cnVtQm90L2Zyb250ZW5kL25vZGVfbW9kdWxlcy9idWZmZXItYWxsb2MtdW5zYWZlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cblxuICBpZiAoQnVmZmVyLmFsbG9jVW5zYWZlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHNpemUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhbGxvY1Vuc2FmZVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/buffer-alloc-unsafe/index.js\n");

/***/ })

};
;