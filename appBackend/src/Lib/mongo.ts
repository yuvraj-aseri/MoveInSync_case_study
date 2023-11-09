import mongoose from 'mongoose';

export const dbConnect = ()=>{ 
    mongoose.connect("mongodb://localhost:27017/",{dbName:"DCut"})
    .then(() => console.log('Mongo DB connected!'))
    .catch((e)=> console.log('Mongo DB connection failed!', e))
};