import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const Res = await mongoose.connect(`${process.env.DATA_BASE_URL}/${process.env.DATA_BASE_NAME}`)

        console.log("connected with the mongodb successfully ")

    } catch (e) {
        console.log("something went wrong while connecting with the data base ", e.message)
    }
}  
