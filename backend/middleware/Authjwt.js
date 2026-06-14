const jwt = require('jsonwebtoken');

function Authjwt(allowedRoles = []) {
    return (req, res, next) => {
        const Authheader = req.headers['authorization'];
        const token = Authheader && Authheader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Token not provided');
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }

            // Role check against roletype field in JWT payload
            if (allowedRoles.length && !allowedRoles.includes(user.roletype)) {
                return res.status(403).send('Access denied: insufficient permissions');
            }

            req.user = user;
            next();
        });
    };
};

module.exports = Authjwt;
