const User = require('../db/model/user')
const { BAD_REQUEST } = require('../errors')

const adminSignIn = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new BAD_REQUEST('Please enter email and password!')
    }
    const user = await User.findOne({ email })
    if(!user || user.type !== 'admin'){
        res.status(500).json({status: false, message: 'User not found'})
    }
    const isPasswordCorrect = await user.matchPassword(password)

    if(!isPasswordCorrect){
        res.status(500).json({status: false, message: 'Invalid Credentials!'})
    }
    const token = user.createJWT()
    res.cookie("auth_token", token, { httpOnly: true, secure: false })
    res.status(200).json({ user: { name: user.name } })
}
const adminLogout = async (req, res) => {
    res.clearCookie("auth_token");
    res.status(200).json({ success: true, message: "logout successful" })
}

module.exports = {
    adminSignIn,
    adminLogout
}