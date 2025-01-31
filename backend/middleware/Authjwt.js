const jwt = require('jsonwebtoken');
function Authjwt(allwedRoles = []){
    return (req,res,next)=>{
        const Authheader = req.headers['authorization'];
        const token = Authheader && Authheader.split(' ')[1];
        if (token == null){
            return res.status(401).send('token not provided');
        }
        jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(403).send('Invalid token');
            }
            if (allowedRoles.length && !allowedRoles.includes(user.role)){
                return res.status(403).send('Access denied: insufficient permissions');
            }
            req.user = user;
            next();
        });
    };
};
module.exports = Authjwt;