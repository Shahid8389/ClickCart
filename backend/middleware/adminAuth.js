import jwt from 'jsonwebtoken';


const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized, requires permission!"
            })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not Authorized, requires permission!"
            })
        }

        next();

    } catch (error) {
        console.log("Error, in the api Admin authentication, ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export default adminAuth;