function toQuadKey(x, y, z) {
	var index = '';
	for (var i = z; i > 0; i--) {
		var b = 0;
		var mask = 1 << (i - 1);
		if ((x & mask) !== 0) b++;
		if ((y & mask) !== 0) b += 2;
		index += b.toString();
	}
	return index;
}

module.exports = toQuadKey;
