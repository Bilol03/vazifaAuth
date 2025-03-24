import mongoose from 'mongoose'

let connectDB = async () => {
try {
    await mongoose.connect(process.env.DB)
	console.log('Connectd to Database')
} catch (error) {
    throw error
}
}
export { connectDB }
