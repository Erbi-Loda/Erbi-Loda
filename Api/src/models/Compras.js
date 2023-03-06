import mongoose from "mongoose";
const comprasSchema = new mongoose.Schema({
  producto: [
    {
      type: Object,
      required: true,
    },
  ],
  fecha:{
    type:String,
    required:true,
  },
  comprador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vendedor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    autopopulate: true,
  },
});
export default mongoose.model("Compras", comprasSchema);
