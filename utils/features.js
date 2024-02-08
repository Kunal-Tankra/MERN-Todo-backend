import pkg from "jsonwebtoken"
const { sign } = pkg

export const sendCookie = (user, res, message, statusCode = 200) => {
    // creating token to store in cookies
    const token = sign({ _id: user._id }, process.env.JWT_SECRET)

    res.status(statusCode).json({
        success: true,
        message,
        token
    })
}