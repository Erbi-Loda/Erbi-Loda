import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    passwordCPU:{
        type:String,
        required:true
    },
    companies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
          autopopulate: true,
        },
      ],
})


export default mongoose.model('User', userSchema)