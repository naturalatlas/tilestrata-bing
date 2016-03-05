/* globals describe it */
var http = require('http');
var bing = require('../index.js');
var tilestrata = require('tilestrata');
var assert = require('chai').assert;

function isJPEG(buffer) {
	return buffer.slice(0, 3).toString('hex').toUpperCase() === 'FFD8FF';
}

describe('"tilestrata-bing"', function() {
	it('should set "name"', function() {
		assert.equal(bing({key: 'test'}).name, 'bing');
	});

	it('should return png', function(done) {
		this.timeout(5000);

		var server = tilestrata();
		var req = tilestrata.TileRequest.parse('/layer/14/3145/5923/t.png');
		server.layer('layer').route('t.png').use(bing({
			// DO NOT USE THIS KEY IN YOUR APPS, THIS IS JUST FOR TESTING
			key: 'ArEhk_0H6diotQyCc06cSM-vSnZMMS6MDqd2U971OjVLn_BiGbEY4ShE7X09v6gK',
			imagery: 'Aerial'
		}));

		server.initialize(function(err) {
			if (err) throw err;
			server.serve(req, false, function(status, buffer, headers) {
				assert.equal(status, 200);
				assert.equal(headers['content-type'], 'image/jpeg');
				assert.isTrue(isJPEG(buffer), 'Buffer is JPEG');
				done();
			});
		});
	});
});
