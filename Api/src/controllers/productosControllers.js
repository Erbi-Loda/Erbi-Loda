import Productos from "../models/Productos.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import Compras from "../models/Compras.js";
import ComprasCarrito from "../models/ComprasCarrito.js";
import mercadopago from "mercadopago";
import nodemailer from "nodemailer";

mercadopago.configure({ access_token: process.env.ACCESSTOKENMERPA });
export const pagoProducto = async (req, res) => {
  const { productos } = req.body;
  const user = await User.findById(req.user._id);
  let preference = {
    items: productos.map((e) => {
      return {
        id: e._id,
        title: e.productoname,
        currency_id: "ARS",
        category_id: "art",
        picture_url: e.img[0],
        description: e.description.slice(0, 256),
        unit_price: Number(e.price),
        quantity: e.quantity,
      };
    }),
    back_urls: {
      success: "http://127.0.0.1:5173",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then(async (response) => {
      res.status(200).send({ response });
      const generadorcomras = async () => {
        let arrayCompras = [];
        let arrayCompaniasID = [];
        let productosger = await Promise.all(
          productos.map(async (e) => {
            await Compras.create({
              producto: e,
              fecha: new Date(),
              comprador: user,
              vendedor: e.companyId,
            }).then(async (res) => {
              arrayCompaniasID.push(e.companyId);
              arrayCompras.push({ id: res._id, companyId: e.companyId });
            });
          })
        );
        await ComprasCarrito.create({
          compras: arrayCompras.map((j) => j.id),
        });
        let h = arrayCompaniasID.filter((item, index) => {
          return arrayCompaniasID.indexOf(item) === index;
        });
        h.map(async (e) => {
          const company = await Company.findById(e);
          company.ventas;
          arrayCompras
            .filter((r) => r.companyId === e)
            .map((y) => company.ventas.push(y.id));
          await company.save();
        });
        return productosger;
      };
      generadorcomras();
    })
    .catch((e) => res.status(400).send({ error: e.message }));
};

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
  console.log(productos);
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

  //==========================================================
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: { // XOauth2
      user: process.env.EMAIL_ERBILODA,
      pass: process.env.PASS_ERBILODA,
    },
  });

  const mailOption = {
    from: process.env.EMAIL_ERBILODA, // sender address
    to: "alexiscoronel545@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1 style='color:blue'>Hola alesi</h1>", // html body
  };
  let info = await transporter.sendMail(mailOption,(err,inf)=>{
    if(err) console.log("Error>",err)
    else{
      console.log("Email Enviado.")
    }
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //============================================================

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
