import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  idPublic: {
    type: String
  },
  favorito: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
  historialInfinito: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
  historialWithDate:[
    {
      type:Object
    }
  ],
  compras: [{
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    Product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
    fecha:{
      type:String
    }
  }],
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
});
export default mongoose.model("User", userSchema);
