import { mongoose } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

let User = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Something wrong with email'],
	},
	age: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		select: false,
	},
})

User.pre('save', async function (next) {
	let password = this.password
	this.password = await bcrypt.hash(password, 12)
	console.log(this.password)

	next()
})

let users = mongoose.model('users', User)
export default users
