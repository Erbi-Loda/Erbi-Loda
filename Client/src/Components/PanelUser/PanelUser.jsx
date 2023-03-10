import NavBarComponent2 from "../Navbar/Navbar2.jsx";
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import "./PanelUser.style.css";
import ButtonLoda from '../ButtonLoda/ButtonLoda';
import { useEffect } from "react";

export default function PanelUser(params) {
  const infoUser = {
    username: "Vera",
    password: "Vera123",
    email: "VeraVcp123@gmail.com",
    imgUrl:"https://randomuser.me/api/portraits/women/27.jpg",
    compras: [
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 1,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 2,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 3,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 4,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 5,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
    ],
    companies: [
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 2,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 4,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
    ],
    historial: [
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 2,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 3,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
      {
        nameProduct: "producto",
        urlImg:
          "https://pixabay.com/es/photos/granos-de-caf%c3%a9-caf%c3%a9-asado-frijoles-917613/",
        idProducto: 4,
        descriptionShort:
          "Lorem aoishdka sdi usadpifnalsd fhpiasn ekfjn aps udhfasen fpausi he;fonaspoefh a;sefpiaoseh f;oiasje fpoans df npoasfehf",
      },
    ],
  };
const pedirhistorial=()=>{const options = { method: "GET",headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': '',
  'authorization':'Bearer '+localStorage.getItem('userloda')
} };
  fetch("http://localhost:8080/gethistorialinfinitouser",options)
  .then(e=>e.json())
  .then(data=>console.log(data))
}
useEffect(() => {
  pedirhistorial()
}, [])

  return (
    <div>
      <NavBarComponent2/>
      <div className="container-PanelUser">
        {/* Barra de navegacion de el usuario */}
        <section className="NavUser">
          <div className="infoUser">
            <div className="container-PhUser">
              <img className="Ph-User" src={infoUser.imgUrl} alt="Aqui va la foto del usuario" />
            </div>
            <h1 className="userName"> {infoUser.username} </h1>
          </div>
          <div className="container-Buttons">
              <ButtonLoda type={"small"}  fs={20} text={"Mi Historial"} icon={<HistoryIcon style={{fontSize:'18px'}}/>} />
              <ButtonLoda  type={"small"}  fs={20} text={"Mis Compras"} icon={<ShoppingCartCheckoutIcon style={{fontSize:'18px'}}/>}/>
              <ButtonLoda  type={"small"}  fs={20} text={"Mis Empresas"} icon={<ShoppingCartCheckoutIcon style={{fontSize:'18px'}}/>}/>
              <ButtonLoda type={"small"}  fs={20} text={"Configuraci??n"} icon={<SettingsIcon style={{fontSize:'18px'}}/>} />
              <ButtonLoda type={"small"}  fs={20} text={"Cerrar Sesion"} icon={<MeetingRoomIcon style={{fontSize:'18px'}}/>} />
          </div>
        </section>
        {/* Espacio de Muestra para las compras/configuracion/historial */}
        <div className="muestras"></div>
      </div>
    </div>
  );
}
