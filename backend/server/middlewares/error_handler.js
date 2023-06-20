const errorHandler = (err, req, res, next) => {
    if(err instanceof Error){
        return res.status(err.statusCode).json({success: false, message: err.message})
    }
    return res.status(500).json({success: false, message: "Something went wrong, please try again!"})
}

module.exports = errorHandler;