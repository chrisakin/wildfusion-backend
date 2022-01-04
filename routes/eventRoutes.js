const router = require('express').Router();
const eventController = require('../controller/events')
const checkJWT = require('../middleware/check-jwt');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


aws.config.update({
  secretAccessKey: "VFSpc7Ylsqkupy2UYa0fii1w96MTIGwy72ff6+ZI",
  accessKeyId: "AKIAJ62OLW7YDJE6RFEA",
  region: "eu-west-1"
});

const s3 = new aws.S3( );
//function to upload resources to AWS using multer service 
var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'streams-project',
    metadata: function (req, file, cb) {
              console.log(file);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

router.post('/', [upload.single('file')], (eventController.postEvents));
router.get('/', eventController.getEvents);

module.exports = router;