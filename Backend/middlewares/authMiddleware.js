const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if (!token) return res.status(401).json({ error: 'No hay token' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.user._id;
        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' })
    }
}

module.exports = verifyToken