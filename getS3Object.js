let AWS = require('aws-sdk');

let s3 = new AWS.S3();
let bucketName = 'shopping-guide-bucket';
let params = {
	Bucket: bucketName,
	Prefix: 'gallery/thumbs/'
};

s3.listObjects(params, (err, data) => {
	if (err) console.error(err);
	else console.log(data);
});
