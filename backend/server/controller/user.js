const User = require('../db/model/user')
const { BAD_REQUEST } = require('../errors')

const adminSignIn = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new BAD_REQUEST('Please enter email and password!')
    }
    const user = await User.findOne({ email })
    if(!user || user.type !== 'admin'){
        return res.status(500).json({status: false, message: 'User not found'})
    }
    const isPasswordCorrect = await user.matchPassword(password)

    if(!isPasswordCorrect){
        return res.status(500).json({status: false, message: 'Invalid Credentials!'})
    }
    const token = await user.createJWT();
    res.cookie("auth_token", token, { httpOnly: true, secure: false })
    return res.status(200).json({ user: { name: user.name } })
}
const adminLogout = async (req, res) => {
    res.clearCookie("auth_token");
    return res.status(200).json({ success: true, message: "logout successful" })
}

module.exports = {
    adminSignIn,
    adminLogout
}