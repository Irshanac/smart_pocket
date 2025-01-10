import mongoose from 'mongoose'
const connectDB=async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database coonection success')
    }
    catch(error)
    {
        console.log('Database connection fail')
        process.exit(1)
    }
};
export default connectDB
