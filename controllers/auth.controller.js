import { errorHandler } from '../utils/error.handler.js'
import User from "../models/users.model.js"
import { responce } from '../utils/responce.handler.js'

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
let LOGIN = errorHandler(async (req, res, next) => {})
let PROFILE = errorHandler(async (req, res, next) => {})

export default {
	REGISTER,
	LOGIN,
	PROFILE,
}
