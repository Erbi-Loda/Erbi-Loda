import mongoose from "mongoose";
const comprascarritoSchema = new mongoose.Schema({
  compras: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Compras",
    },
  ],
});
export default mongoose.model("ComprasCarrito", comprascarritoSchema);
