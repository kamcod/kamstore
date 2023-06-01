const express = require('express')
const router = express.Router();

router.route('/admin').post(async (req, res) => {
console.log('here in admin')
});

module.exports = router;