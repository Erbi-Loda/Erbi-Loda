import jwt from "jsonwebtoken"

export const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username,
            pcpu:user.passwordCPU
        },
        process.env.TOKEN_JWT,
        {
            expiresIn: 60*60*24000000,
        }
    )
}


export const verifyToken = async (token) => {
    try{
        return jwt.verify(token, process.env.TOKEN_JWT)
    } catch (e){
        return null
    }
} 