import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
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
        type: Number,
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
        ref: 'Company',
        autopopulate: true
      }
})
export default mongoose.model('Productos', productosSchema)