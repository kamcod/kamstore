class Bad_Request extends Error{
    constructor(message) {
        super( message);
        this.statusCode = 400;
    }
}

module.exports = Bad_Request;