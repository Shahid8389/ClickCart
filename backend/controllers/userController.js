import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if the user with entered email and password is exists in the database or not.
        const userExists = await userModel.findOne({email});

        if (!userExists) {
            return res.json({
                success: false,
                message: "User doesn't exists"
            })
        }

        // Check if the user entered password matches with the password present in the database
        const isPasswordMatch = await bcrypt.compare(password, userExists.password)

        if (isPasswordMatch) {
            // generating the token for the user
            const token = createToken(userExists._id)

            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        console.log("Error, in the api LoginUser..., ", error);
        res.json({
            success: false,
            message: error.message
        })

    }

}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // check if the user with entered email is already exists in the database.
        const userExists = await userModel.findOne({email});

        if (userExists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // check if the email and password is valid or not.
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please, enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please, enter a strong password"
            })
        }

        // hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating the new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        // generating the token for user
        const token = createToken(user._id)

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log("Error, in the api registerUser...", error);
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)

            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        console.log("Error, in the api adminLogin...", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { loginUser, registerUser, adminLogin };