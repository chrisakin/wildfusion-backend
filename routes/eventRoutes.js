const router = require('express').Router();
const eventController = require('../controller/events')
const checkJWT = require('../middleware/check-jwt');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config()


aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
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
router.post('/book', eventController.bookEvents);
router.post('/view', eventController.viewEvents);
router.put('/edit/:id', eventController.editEvents);

module.exports = router;