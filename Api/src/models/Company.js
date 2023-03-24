import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ventas:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compras",
  }],
  idPublic:{
    type:String
  }
});
export default mongoose.model("Company", companySchema);
