import Productos from "../models/Productos.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
const {mercadopago}= require('../utils/mercadoPago');


export const postProducto = async (req, res) => {
  try {
    const {
      productoname,
      companyId,
      price,
      stock,
      description,
      shortDescription,
      img,
    } = req.body;
    const company = await Company.findById(companyId);
    const producto = await Productos.create({
      productoname: productoname,
      price: price,
      description: description,
      shortDescription: shortDescription,
      img: img,
      views: 0,
      coments: [],
      score: [],
      state: "sale",
      stock: stock,
      favorite: [],
      companyId: company._id,
    });

    const savedProducto = await producto.save();
    company.productos = company.productos.concat(savedProducto._id);
    await company.save();
    return res.json(savedProducto);
  } catch (e) {
    return res.status(400).json({ msg: `Error - ${e}` });
  }
};

export const getProductos = async (req, res) => {
  const productos = await Productos.find();
  console.log(productos)
  res.send(productos);
};
export const getProductosRandom = async (req, res) => {
  const limit = req.query.limit || 5;
  const productos2 = await Productos.aggregate([
    { $sample: { size: Number(limit) } },
    { $sort: { views: -1 } },
  ]);
  res.send(productos2);
};
export const getProductosFamous = async (req, res) => {
  const limit = req.query.limit || 5;
  const productos2 = await Productos.aggregate([
    { $sort: { views: -1 } },
  ]).limit(Number(limit));
  res.send(productos2);
  console.log("hola");
};
export const getDetailProduct = async (req, res) => {
  const producto = await Productos.findById(req.params.id);
  res.send(producto);
  const user = await User.findById(req.user._id);

  
  
  
  
  if (user) {
    let historialCopiadoinfinito = user.historialInfinito;
    let historialWithDate = user.historialWithDate;
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);

    if (
      historialCopiadoinfinito.some((e) => e._id.toString() === req.params.id)
    ) {
      historialCopiadoinfinito = historialCopiadoinfinito.filter(
        (e) => e._id.toString() !== req.params.id
      );
      let indexproduct =
        historialWithDate.findIndex((e) => e.producto === req.params.id) ||
        false;
      if (indexproduct && indexproduct > -1) {
        if (historialWithDate[indexproduct].date <= hoy) {
          historialWithDate.splice(indexproduct, 1);
          historialWithDate.unshift({ producto: req.params.id, date: manana });
          const producto2 = await Productos.findByIdAndUpdate(req.params.id, {
            views: Number(producto.views) + 1 + "",
          });
        }
      }
      if (indexproduct && indexproduct < 0) {
        historialWithDate.unshift({ producto: req.params.id, date: manana });
        const producto2 = await Productos.findByIdAndUpdate(req.params.id, {
          views: Number(producto.views) + 1 + "",
        });
      }
    }
    historialCopiadoinfinito.unshift(producto._id);
    user.historialWithDate = historialWithDate;
    user.historialInfinito = historialCopiadoinfinito;
    await user.save();
  }

};
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Productos.findByIdAndDelete(id);
    res.send(result);
  } catch (e) {
    return res.json({ msg: `Error - ${e}` });
  }
};
export const pagarProducto = async (req, res) => {
  const categoriaBuscar = req.params.id;
  const datos = req.body.items;
  const producto = await Productos.findById(categoriaBuscar);
  const user = await User.findById(req.user._id);
  let preference = {
    transaction_amount: parseInt(producto.price * 1.21),
    binary_mode: true,
    payer: {
      name:user.name,
      email:user.email
    },
    items:[
      {
        picture_url: datos.picture_url,
        title: producto.title,
        unit_price: parseInt(producto.price*1.21),
        quantity:1,
        description: producto.description,
      }
    ],
    back_urls:{
      "success": `http://localhost:8080/...`,
      "failure": `http://localhost:8080/...`,
      "pending": `http://localhost:8080/...`,
    },
    auto_return:  "approved",
  };

  mercadopago.preferences.create(preference).then((response)=>{
    console.log(response)
    res.json({
      global: response.body.id,
    });
  }).catch((error)=>{
    console.log(error);
  })
};
