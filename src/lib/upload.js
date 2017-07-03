const efp = require("express-form-post");
const bcrypt = require("bcryptjs");
const formPost = efp({
	store: "aws-s3",
	maxfileSize: 4194304,
	promise: true,
	validateBody: function(body, cb) {
		cb();
	},
	validateFile: function(fieldname, mimetype, cb) {
		if(fieldname != "resume") {
			return cb(new Error("Please do not try and upload more files than allowed"));
		}
		if(mimetype != "application/pdf") {
			return cb(new Error("File was not a pdf"));
		}
		cb();
	},
	filename: function(req, file, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(Date.now().toString() + file.originalname, salt, (err, hash) => {
				cb(hash.replace(/\//g, "_").substr(0,8) + Date.now() + "\/" + file.originalname);
			});
		});
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

module.exports = formPost;