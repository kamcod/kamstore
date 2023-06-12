const errorHandler = (err, req, res, next) => {
    if(err instanceof Error){
        res.status(err.statusCode).json({success: false, message: err.message})
    }
    res.status(500).json({success: false, message: "Something went wrong, please try again!"})
}

module.exports = errorHandler;