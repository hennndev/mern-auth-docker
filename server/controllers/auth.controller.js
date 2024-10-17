const Users = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (email, secret, expiresTime) => {
    return jwt.sign({email}, secret, {expiresIn: expiresTime})
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({email})
        if(user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if(checkPassword) {
                const token = generateToken(user.email, process.env.TOKEN_SECRET_LOGIN, "24h")
                res.status(200).json({
                    ok: true,
                    message: "Success logged in",
                    token
                })
            } else {
                throw new Error("Password salah")
            }
        } else {
            throw new Error("Email tidak terdaftar")
        }     
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message
        })
    }
}


const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await Users.findOne({email: email})
        if(user) {
            throw new Error("Email sudah terdaftar")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = bcrypt.hash(password, salt)
            const newUser = {
                username, email, password: hashPassword
            }
            Users.create(newUser)
            res.status(201).json({
                status: "Ok",
                message: "Success create new user"
            })
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = {
    login, 
    register
}