const express = require('express')
const router = express.Router();
const { getUser } = require('../controller/jobs')

router.route('/get-user').post(getUser);

module.exports = router;