function bboxIntersect(bbox1, bbox2) {
	return !(
		bbox1[0] > bbox2[2] ||
		bbox1[2] < bbox2[0] ||
		bbox1[3] < bbox2[1] ||
		bbox1[1] > bbox2[3]
	);
}

module.exports = bboxIntersect;
