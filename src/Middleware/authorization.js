const jwt = require ('jsonwebtoken')
const authorise = function (req, res, next) {
    try {
        
            // comapre the logged in user's id and the id in request
            let token = req.headers["x-auth-token"]
            let decodedToken = jwt.verify(token , "functionup-")
        
            let authorToBeModified = req.query
            
            //userId for the logged-in user
            let userLoggedIn = decodedToken.authorId
             req.authorId = userLoggedIn
        
            //userId comparision to check if the logged-in user is requesting for their own data
            if (authorToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
            next()
        

        
    } catch (error) {
        console.log(error.message);
    }
    
    };
    module.exports.authenticate = authenticate
    module.exports.authorise = authorise