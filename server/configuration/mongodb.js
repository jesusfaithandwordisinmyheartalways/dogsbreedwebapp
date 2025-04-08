


import mongoose from 'mongoose'



const connectMongoDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_DB_URL, {
                useNewUrlParser: true, 
                useUnifiedTopology:true
            })
            console.log('MongoDB connected successfully')
        }catch(error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
}



export default connectMongoDB 