import { resposcha } from "./responce.handler.js"

let errorHandler = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => {
			console.log(err, 'errorcha')
			resposcha(res, 404, 'Xatolik: ' + err.message)
		})
	}
}

export { errorHandler }
