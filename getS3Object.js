let AWS = require('aws-sdk');
let async = require('async');

let s3 = new AWS.S3();
let bucketName = 'shopping-guide-bucket';
let params = {
	Bucket: bucketName,
	Prefix: 'gallery/thumbs/'
};
let flag = true;
let files = [];

async.whilst(
	function() { return flag; },
	function(cb) {
		s3.listObjects(params, (err, data) => {
			if (err) return;

			files = files.concat(data.Contents);
			
			if (data.IsTruncated) {
				let length = data.Contents.length;
				let marker = data.Contents[length - 1].Key;
				params.Marker = marker;
				setTimeout(cb, 100);
			} else {
				files.forEach(item => {
					console.log(item.Key);
				});
				flag = false;
			}
		});
	},
	function(err) {
		console.log(files);
	}
);
