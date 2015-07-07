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