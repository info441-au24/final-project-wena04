import mongoose from 'mongoose'

let models = {}

console.log("connecting to mongodb")

await mongoose.connect('mongodb+srv://mikelabz:1234@cluster0.kxlma.mongodb.net/EMT?retryWrites=true&w=majority&appName=Cluster0')

console.log("successfully connected to mongodb")

export default models
