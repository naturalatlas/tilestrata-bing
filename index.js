var request = require('request');
var memoizeAsync = require('memoizeasync');
var bboxIntersect = require('./lib/bbox-intersect');
var quadkey = require('./lib/quadkey');

module.exports = function(opts) {
	var imagerySet = opts.imagery || 'Aerial';
	var metadataURL = 'http://dev.virtualearth.net/REST/v1/Imagery/Metadata/{imagerySet}?key={bingMapsKey}&include=ImageryProviders'
		.replace('{bingMapsKey}', opts.key)
		.replace('{imagerySet}', imagerySet);

	var getMetadata = memoizeAsync(function(callback) {
		request(metadataURL, function(err, res, body) {
			if (err) return callback(err);
			if (res.statusCode !== 200) return callback(new Error('Expected HTTP 200 OK from Bing, got ' + res.statusCode));
			if (typeof body === 'string') body = JSON.parse(body);
			var resource = body.resourceSets[0].resources[0];

			callback(null, {
				url: resource.imageUrl,
				providers: resource.imageryProviders,
				subdomains: resource.imageUrlSubdomains
			});
		});
	});

	var getTileURL = function(z, x, y, callback) {
		getMetadata(function(err, metadata) {
			if (err) return callback(err);
			var url = metadata.url
				.replace('{quadkey}', quadkey(x, y, z))
				.replace('{subdomain}', metadata.subdomains[0])
				.replace('{culture}', 'en-US');

			callback(null, url);
		});
	};

	return {
		name: 'bing',
		serve: function(server, tile, callback) {
			getTileURL(tile.z, tile.x, tile.y, function(err, url) {
				if (err) return callback(err);
				request({url: url, encoding: null}, function(err, res, body) {
					if (err) return callback(err);
					if (res.statusCode !== 200) {
						err = new Error('Unexpected status from Bing Maps (HTTP ' + res.statusCode + ')');
						err.statusCode = res.statusCode;
						return callback(err);
					}
					callback(null, body, res.headers);
				});
			});
		}
	};
};
