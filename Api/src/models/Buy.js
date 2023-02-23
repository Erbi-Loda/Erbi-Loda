import mongoose from "mongoose";

const buySchema = new mongoose.Schema({
    productoname: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    views: {
      type: String,
      required: true,
    },
    coments: {
      type: Array,
      required: true,
    },
    score: {
      type: Array,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    favorite: {
      type: Array,
      required: true,
    },
    companyId: {
      type: String,
      required:true
    },
    Product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
    fecha:{
      type:String,
      required:true
    },
    company:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    address:{
      type:String,
      required:true
    }
});

export default mongoose.model("Buy", buySchema);
