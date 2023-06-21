const express = require('express')
const router = express.Router();
const { getUser, getDashboardStats } = require('../controller/jobs')

router.route('/get-user').post(getUser);
router.route('/get-dashboard').get(getDashboardStats);

module.exports = router;