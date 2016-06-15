'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  var insertCssPath = _path2.default.join(__dirname, './insertCss.js');
  var output = '\n    var md5 = require(\'js-md5\');\n    var content = require(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ');\n    var insertCss = require(' + (0, _loaderUtils.stringifyRequest)(this, '!' + insertCssPath) + ');\n\n    if (typeof content === \'string\') {\n      content = [[module.id, content, \'\']];\n    }\n\n    var stringifiedContent = content.toString();\n    var md5sum = md5(stringifiedContent);\n\n    module.exports = content.locals || {};\n    module.exports._getCss = function() { return { md5: md5sum, content: stringifiedContent }; };\n    module.exports._insertCss = function(options) {\n      options = options || {};\n      options[\'md5\'] = md5sum;\n\n      return insertCss.call(this, content, options);\n    };\n  ';

  output += this.debug ? '\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (module.hot && typeof window !== \'undefined\' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ', function() {\n        content = require(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ');\n\n        if (typeof content === \'string\') {\n          content = [[module.id, content, \'\']];\n        }\n\n        removeCss = insertCss(content, { replace: true, md5: md5sum });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  ' : '';

  return output;
};