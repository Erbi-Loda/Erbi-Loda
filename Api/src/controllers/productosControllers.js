import Productos from "../models/Productos.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

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
  res.send(productos);
};
export const getDetailProduct = async (req, res) => {
  const producto = await Productos.findById(req.params.id);
  const producto2 = await Productos.findByIdAndUpdate(req.params.id, {
    views: Number(producto.views) + 1 + "",
  });
  const user = await User.findById(req.user._id);

  if (user) {
    let historialCopiado = user.historial;
    if (historialCopiado.some((e) => e.toString() === req.params.id)) {
      historialCopiado = historialCopiado.filter(
        (e) => e.toString() !== req.params.id
      );
    }
    if (user && user.historial.length === 5) {
      historialCopiado.pop();
    }
    historialCopiado.unshift(producto._id);
    user.historial = historialCopiado;
    await user.save();

  }
  if (user) {
    let historialCopiadoinfinito = user.historialInfinito;
    if (historialCopiadoinfinito.some((e) => e.toString() === req.params.id)) {
      historialCopiadoinfinito = historialCopiadoinfinito.filter(
        (e) => e.toString() !== req.params.id
      );
    }
    historialCopiadoinfinito.unshift(producto._id);
    user.historialInfinito = historialCopiadoinfinito;
    await user.save();

  }

  res.send(producto);
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
