const User = require('../db/model/user');

const getUser = async (req, res) => {
    return res.status(200).json({ success: true, user: {...req.user, extra: 123} })
}

const getDashboardStats = async (req, res) => {
    const userCount = await User.findOne({_id: req.user.userId}).count();
    return res.status(200).json({
        totalUsers: userCount - 1   // -1 for admin user
    })
}

module.exports = {
    getUser,
    getDashboardStats
}