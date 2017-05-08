// multer settings & configuration
const multer = require('multer');

module.exports = (storageOptions) => {

  const upload = multer({
    storage: storageOptions,
    limits: { fileSize: 4194304 },
    fileFilter: (req, file, cb) => {
      if(file.mimetype != 'application/pdf') {
        return cb(new Error('File was not a pdf'));
      }
      cb(null, true);
    },

  }).single('resume');

  return upload;
}
