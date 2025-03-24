import { errorHandler } from '../utils/error.handler.js'
import { responce } from '../utils/responce.handler.js'
import User from "../models/users.model.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

let REGISTER = errorHandler(async (req, res, next) => {
	let body = req.body
	if (
		!body.firstName ||
		!body.username ||
		!body.age ||
		!body.email ||
		!body.password
	) throw new Error('Datas not entered fully')

	let [existUser, existUserEmail] = await Promise.all([
		User.find({ username: body.username }),
		User.find({ email: body.email }),
	])
	if (existUser.length || existUserEmail.length) {
		throw new Error(
			`boshqa ${existUser.length ? 'username' : 'email'} qo'y`,
		)
	}

    let user = await User.create(body)
    responce(res, 201, {message: "Successfully registered!", user})
})
let LOGIN = errorHandler(async (req, res, next) => {
    let {username, password} = req.body

    if(!username || !password) throw new Error("Username or Password not enetered")
    
    let user = await User.findOne({username: username})
    if(!user) throw new Error(404, "User not found!")

    let checkedPasswd = bcrypt.compare(password, user.password)
    if(!checkedPasswd) throw new Error("Wrong password!")
    
    let token = jwt.sign({id: user.id, username: user.username, age: user.age}, process.env.SECRET_KEY, {expiresIn: '1h'})

    responce(res, 200, {message: "Successfully logged in", user, token})
})
let PROFILE = errorHandler(async (req, res, next) => {
    let userId = req.user.id
    let user = await User.findOne({_id: userId}).exec()
    if(!user) throw new Error("User not found. Token not valid")
    responce(res, 201, {message: "Success", user})
})

export default {
	REGISTER,
	LOGIN,
	PROFILE,
}
