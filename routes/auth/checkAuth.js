module.exports = (req, res, next) => {    
    // if you already have the decodedJwt there is no reason to verify it - therefore we can call next
    if(req.decodedJwt) {
        next();
    } else if(req.headers.authorization) {
        let token = req.headers.authorization
        // this checks that the token has the Bearer type. The client shouldnt be able to send the token without a bearer type. Once we have the bearer type
        // then what we want returned is the token without the Bearer string attached. Hence why we need to use the slice method(notice bearer with a space is 7 characters long)
        // and the trim method is used to clean up any extra white space that may have been accidentally added from the client side.
        token.includes('Bearer ') ? token : res.status(400).json({ message: "Unable to verify authorization header type."});
        token = token.slice(7, token.length).trim();

        jwt.verify(token, jwtSecret, (err, decodedJwt) => {
            if(err) {
                res.status(400).json({message: 'Unable to verify token', error: err});
            } else {
                req.decodedJwt = decodedJwt;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'You dont have authorization, please provide the correct token in the header.' });
    }
}