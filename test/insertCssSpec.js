/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import jsdom from 'jsdom';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import insertCss from '../src/insertCss';
import md5 from 'js-md5';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

describe('insertCss(styles, options)', () => {
  it('Should insert and remove <style> element', () => {
    const css = 'body { color: red; }';
    const md5sum = md5(css);

    const removeCss = insertCss([[1, css]], { md5: md5sum });
    let style = global.document.getElementById(md5sum);
    expect(style).to.be.ok;
    expect(style.textContent).to.be.equal(css);
    expect(removeCss).to.be.func;
    removeCss();
    style = global.document.getElementById(md5sum);
    expect(style).to.be.null;
  });
});
