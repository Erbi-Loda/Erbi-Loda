import * as React from "react";
import CardBox from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Card.style.css";
// import { Link } from "react-router-dom";
import ButtonLoda from "../ButtonLoda/ButtonLoda";
import { useNavigate } from "react-router-dom";

export default function Card({
  name,
  favorite,
  favorite2,
  putFavorite,
  DetalleProduct,
  agregarAlCarrito,
  shDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor",
  price = "$$$",
  img,
  id,
}) {
  const [estadofuncion, setEstadofuncion] = React.useState(false);
  const functionput=async()=>{
    setEstadofuncion(true)
  await  Promise.all([putFavorite(id, favorite2)]).finally(()=>setEstadofuncion(false))
  }
  const navigate = useNavigate();
  const [first, setfirst] = React.useState(localStorage.getItem("carrloer"))
  return (
    <CardBox
      sx={{ margin: "15px", width: "224px" }}
      className="contenedor-carta-postproduct"
    >
      <div
        onClick={async() =>{await DetalleProduct(id).then(()=>navigate("/producto/"+id))} }
        to={"/producto/" + id}
        style={{ textDecoration: "none" }}
      >
        <div className="conetnedor-hover-shDesct-postproduct">
          <div className="contenedor-img-card">
            <img
              src={img.slice(0,50)+"q_55/"+img.slice(50,-4)+".avif"}
              alt={"image product"}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="hover-shDesct-postproduct">
            <Typography
              style={{
                width: "224px",
                height: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="body2"
              color="text.secondary"
            >
              {shDesc.length > 70 ? shDesc.slice(0, 70) + "..." : shDesc}
            </Typography>
          </div>
        </div>
      </div>
      <CardContent sx={{ position: "relative", padding: "16px 16px 0px 16px" }}>
        <Typography gutterBottom variant="h5" component="div">
          ${price}
        </Typography>
        <div
          style={{
            position: "absolute",
            width: "max-content",
            top: "0",
            right: "55px",
          }}
        >
          <div
            style={{ position: "relative", width: "max-content", zIndex: "2" }}
          >
            <TurnedInIcon
              onClick={
                !estadofuncion
                  ? functionput
                  : null
              }
              sx={{
                width: "55px",
                height: "55px",
                position: "absolute",
                top: "-10px",
                color: "#003A00",
              }}
            ></TurnedInIcon>
            <FavoriteIcon
              onClick={
                !estadofuncion
                  ? functionput
                  : null
              }
              sx={[
                {
                  position: "absolute",
                  width: "35px",
                  height: "25px",
                  left: "10px",
                  top: "0px",
                },
                favorite ? { color: "#00F106" } : { color: "white" },
              ]}
            ></FavoriteIcon>
          </div>
        </div>{" "}
      </CardContent>
      <CardActions style={{ justifyContent: "space-around" }}>
        <div
        onClick={async() =>{await DetalleProduct(id).then(()=>navigate("/producto/"+id))} }
          to={"/producto/" + id}
          style={{ textDecoration: "none" }}
        >
          <ButtonLoda type={"small"} text={"Ver mas"} fs={14} />
        </div>
        <div onClick={()=>agregarAlCarrito({_id:id,img,price,description:DetalleProduct,productoname:name,quantity:1})}>
        <ButtonLoda type={"small"} text={"+ Carrito"} fs={14} />
        </div>
      </CardActions>
    </CardBox>
  );
}
