import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.handler.js'
let Autharization = errorHandler(async (req, res, next) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith('Bearer')
	) throw new Error('Wrong token')
	let token = req.header('Authorization')
	token = token.split(' ')[1]
	let user = jwt.verify(token, process.env.SECRET_KEY)
	req.user = user
	next()
})

export { Autharization }
