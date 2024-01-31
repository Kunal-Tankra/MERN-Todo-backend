import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js"



// export const getAllUsers = async (req, res) => {

// }


export const getMyProfile = (req, res) => {


    res.json({
        success: true,
        user: req.user
    })
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return next(new ErrorHandler("User Already Exist", 404))
        }


        // if (user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 
        //     })
        // }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        sendCookie(createdUser, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }

}



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        }

        // if (!user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid Email or Password"
        //     })
        // }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid Email or Password"
            // })

            return next(new ErrorHandler("Invalid Email or Password", 404))
        }

        sendCookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }

}

export const logout = (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
        success: true,
        user: req.user
    })
}