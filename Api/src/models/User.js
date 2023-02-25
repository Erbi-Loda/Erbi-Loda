import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
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
      autopopulate: true,
    },
  ],
  historialInfinito: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
      autopopulate: true,
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
      type: String,
      required:true
    },
    Product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
      autopopulate: true,
    }
  }],
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      autopopulate: true,
    },
  ],
});
userSchema.plugin(autopopulate);
export default mongoose.model("User", userSchema);
