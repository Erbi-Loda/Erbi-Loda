import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
    message:{
        text:{
            type:String,
            required:true
        },
    },
        users:Array,
        sender:{
            type:String
        },
    },
    {
        timestamps:true,
    }
)

export default mongoose.model("Message", messageSchema);