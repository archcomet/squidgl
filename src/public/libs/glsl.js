/**
 The MIT License (MIT)

 Copyright (c) 2014-2015 Michael Good

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

define(['module'], function(module) {

	var moduleConfig = (module.config && module.config()) || {};

	var glsl =  {

		version: '1.0.0',

		load: function(name, require, onLoad) {

			function finishLoad(error, responseText) {
				if (error) {
					onLoad.error(error);
					return;
				}

				onLoad(responseText);
			}

			glsl.get(require.toUrl(name + '.glsl'), moduleConfig.headers, finishLoad);
		},

		get: function(url, headers, callback) {

			var xhr = new XMLHttpRequest();

			if (headers) {
				for (var header in headers) {
					if (headers.hasOwnProperty(header)) {
						xhr.setRequestHeader(header.toLowerCase(), headers[header]);
					}
				}
			}

			xhr.onreadystatechange = function() {
				var status, error;
				if (xhr.readyState === 4) {
					status = xhr.status || 0;
					if (status > 399 && status < 600) {
						error = new Error('XHR GET ' + url + ' ' + status);
						error.xhr = xhr;
						callback(error);
					}
					else {
						callback(null, xhr.responseText);
					}
				}
			};

			xhr.open('GET', url, true);

			xhr.send();
		}
	};

	return glsl;
});