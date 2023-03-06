import userRoutes from "./userRoutes.js";
import companyRoutes from "./companyRoutes.js";
import productosRoutes from "./productosRoutes.js";

//Preparo el index para poder atrapar las rutas correspondientes
import { Router } from "express";
const index_router = Router();

index_router.use(userRoutes);
index_router.use(companyRoutes);
index_router.use(productosRoutes);

index_router.get("/*", (req, res) => {
  res.send({
    routes: [
      {
        Productos: {
          GET: {
            routes: [
              {
                name_controller: "getProductos",
                link: `localhost:${process.env.PORT}/getProductos`,
                desc: "all products",
              },
              {
                name_controller: "getDetailProduct",
                link: `localhost:${process.env.PORT}/getProducto/:id`,
                desc: "description",
              },
              {
                name_controller: "getProductosRandom",
                link: `localhost:${process.env.PORT}/getProductosrandom`,
                desc: "description",
              },
              {
                name_controller: "getProductosFamous",
                link: `localhost:${process.env.PORT}/getProductosFamous`,
                desc: "description",
              },
            ],
          },
          POST: {
            routes: [
              {
                name_controller: "postProducto",
                link: `localhost:${process.env.PORT}/company/postProduct`,
                desc: "description ",
              },
              {
                name_controller: "pagarProducto",
                link: `localhost:${process.env.PORT}/product/buy/:id`,
                desc: "description ",
              },
            ],
          },
          PUT: {
            routes: null
          },
          DELETE: {
            routes: [
              {
                name_controller: "deleteProducto",
                link: `localhost:${process.env.PORT}/company/deleteProduct/:id`,
                desc: "description",
              },
            ],
          },
        },
        Company: {
          GET: {
            routes: [
              {
                name_controller: "getCompany",
                link: `localhost:${process.env.PORT}/company/:id`,
                desc: "description",
              },
            ],
          },
          POST: {
            routes: [
              {
                name_controller: "postCompany",
                link: `localhost:${process.env.PORT}/company/register`,
                desc: "description",
              },
            ],
          },
          PUT: {
            routes: null
          },
          DELETE: {
            routes: null
          },
        },
        User: {
          GET: {
            routes: [
              {
                name_controller: "getUser",
                link: `localhost:${process.env.PORT}/user/:id`,
                desc: "description",
              },
              {
                name_controller: "getHistorialUser",
                link: `localhost:${process.env.PORT}/gethistorialuser`,
                desc: "description",
              },
              {
                name_controller: "getHistorialInfinitoUser",
                link: `localhost:${process.env.PORT}/gethistorialinfinitouser`,
                desc: "description",
              },
              {
                name_controller: "getFavoritoUser",
                link: `localhost:${process.env.PORT}/getFavoritoUser`,
                desc: "description",
              },
            ],
          },
          POST: {
            routes: [
              {
                name_controller: "postUser",
                link: `localhost:${process.env.PORT}/user/register`,
                desc: "description",
              },
              {
                name_controller: "loginUser",
                link: `localhost:${process.env.PORT}/user/login`,
                desc: "description",
              },
            ],
          },
          PUT: {
            routes: [
               {
                name_controller: "putFavoritoUser",
                link: `localhost:${process.env.PORT}/putFavoritoUser`,
                desc: "description",
              },
            ],
          },
          DELETE: {
            routes: null
          },
        },
      },
    ],
  });
});

//Exporto el router para poder utilizarlo en el server;
export default index_router;
