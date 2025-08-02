const express = require('express');
const multer = require('multer');
const { handleResumeUpload, getReviewStatus } = require('../controllers/resumeController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/review-resume', upload.single('resume'), handleResumeUpload);
router.get('/review-status/:email', getReviewStatus);

module.exports = router;