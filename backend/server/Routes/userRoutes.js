const express = require('express')
const router = express.Router();
const { adminSignIn, adminLogout } = require('../controller/user')

router.route('/admin/login').post(adminSignIn);
router.route('/admin/logout').delete(adminLogout);

module.exports = router;