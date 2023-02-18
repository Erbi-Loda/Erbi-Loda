import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
      autopopulate: true,
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idPublic:{
    type:String,
    required:true
  }
});

companySchema.plugin(autopopulate);
export default mongoose.model("Company", companySchema);
