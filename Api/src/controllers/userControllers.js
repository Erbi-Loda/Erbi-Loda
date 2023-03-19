import User from "../models/User.js";
import Message from "../models/Message.js";
import { encrypt, compare } from "../helpers/bCrypt.js";
import { tokenSign } from "../helpers/generadorDeToken.js";
import { uuid } from 'uuidv4';

export const addMenssage =async(req,res)=>{
    try{
        const {from,to,message} = req.body
        const data = await Message.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if(data){
            return res.json({msg:"Message addedd successfully."})
        }
        return res.json({msg:"Failed to add message to the data base"})
    }catch(ex){
        console.log(ex)
    }
}
export const getAllMenssage =async(req,res)=>{
try{
const {from,to} = req.body
const messages= await Message.find({
    users:{
        $all:[from,to]
    }
}).sort({updatedAt:1})
const projectMessages= messages.map((msg)=>{
    return{
        fromSelf:msg.sender.toString()===from,
        message:msg.message.text,
    }
})
res.json(projectMessages)
}catch(ex){
    next(ex)
}
}


export const postUser = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const passwordHash = await encrypt(password)
        await User.create({
            username: username,
            password: passwordHash,
            email: email,
            idPublic: uuid().split('-').join('')
        })
        return res.status(200).json("Usuario creado satisfactoriamente")
    } catch (e) {
        console.log(req.body)
        console.log("e",e)
        return res.status(400).json({ msg: `Error - ${e}` })
    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(405).json({ msg: "Usario no encontrado" });
    }
    const checkPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    if (!checkPassword) {
      return res.status(401).json({ msg: "Contraseña invalida" });
    }
    return res.status(200).send(tokenSession);
  } catch (e) {
    return res.json({ msg: `Error - ${e}` });
  }
};

export const getUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
//     {
//     _id= "63dee17a631f09750f1b7052",
//     username= "test11111",
//     password: "$2a$10$7AUJjs7s36p9dC5LjBuRuO6PjyPsBa5zU7PHPBcD6dJ4S5MRMFcLG",
//     email: "teste1@gmail.com",
//     passwordCPU: "F6bpPGfMvjMckHu",
//     Historial: [],
//     companies: [],
//     __v: 863,
//     historial: [
//         "63e6fc9e8b5b0531e2714bb0",
//     ],
//     compras: [],
//     historialInfinito: [
//         {
//             "_id": "640b71649fceb0f7a0a76d29",
//             "productoname": "Ventilador de pared Liliana VWIT32 negro con 2 palas color plata de metal, 32\" de diámetro 220 V",
//             "price": "44245",
//             "description": "Su funcionamiento está adaptado e ideado para entornos industriales. Esto hace que los distintos gases y aromas sean removidos sin inconvenientes. A su vez, tiene la capacidad de resistir ambientes severos, sin verse afectado por altas temperaturas ni presiones.\n\nComposición perfecta\nCon sus palas elaboradas en metal vas a poder disfrutar de un producto de alta calidad y durabilidad. Su estilo único resalta en cualquier ámbito debido a su óptimo funcionamiento. Para una cobertura mayor de espacios, su oscilación de 180º proporciona un flujo constante de aire que permite refrescar más eficientemente los ambientes.",
//             "shortDescription": "entilador de pared Liliana VWIT32 negro con 2 palas color plata de metal, 32\" de diámetro 220 V",
//             "img": [
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471521/rw2xiad4nwnj2tnyezvy.png"
//             ],
//             "views": 2,
//             "coments": [],
//             "score": [],
//             "state": "sale",
//             "stock": "45",
//             "favorite": [],
//             "companyId": "63def89a96e705cd69d05ff3",
//             "__v": 0
//         },
//     ],
//     favorito: [
//         {
//             "_id": "640b70839fceb0f7a0a76d0b",
//             "productoname": "Aire Acondicionado Siam Split Frío/calor 4472 Frigorías Blanco 220v Sms50ha4cpi",
//             "price": "218999",
//             "description": "CARACTERÍSTICAS:\n\n- Eficiencia Energética Clase A\n- Modo Frío\n- Función I FEEL\n- Súper Silencioso\n- Display LED (con opción de apagado)\n- Función Super\n- Función Smart\n- Refrigerante Ecológico R410a\n- Control Remoto Multifunción\n- Modo Deshumidificación\n- Filtros Lavables\n- Timer Programable\n- Función Sleep\n- Barrido de Aire Automático\n\nEspecificaciones Técnicas:\n\n- Alimentación: 220 VCA / 50 Hz (Monofásico)\n- Refrigerante: R410A\n- Capacidad frío: 5200 W / 4472 Frigs.\n- Consumo eléctrico frío: 1590 W\n- Capacidad calor: 4600 W\n- Consumo eléctrico calor: 1400 W\n- Ef. Energética (Frío) -E.E.R.: 3.27 -Clase A\n- Ef. Energética (Calor) - C.O.P.: 3.29 -Clase C\n- Nivel de ruido máximo (int): 43 dB\n- Cañería de intercon. (Liq./Gas) 1/4\" 5/8\"\n\nUnidad Interior:\n- Medidas Unidad (An/Al/Prof.): 92 x 32,1 x 22,7 (En Cms)\n- Medidas Caja (An/Al/Prof.): 99,5 x 36,5 x 31 (En Cms)\n- Peso Neto 10 Kg\n- Peso Bruto 12 Kg\n\nUnidad Interior:\n- Medidas Unidad (An/Al/Prof.): 81 x 58,5 x 28 (En Cms)\n- Medidas Caja (An/Al/Prof.): 94 x 63 x 38,5 (En Cms)\n- Peso Neto 38 Kg\n- Peso Bruto 42 Kg",
//             "shortDescription": "ncioso\n- Display LED (con opción de apagado)\n- Función Super\n- Función Smart",
//             "img": [
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471267/oauwyjib5cjwjnokeaxv.png",
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471270/uncn9jcyq0m17io38bgc.png",
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471280/bxk2ntjutelrxnerdo6k.png",
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471285/i3hlmqdfvsqcngk3i7bs.png",
//                 "https://res.cloudinary.com/dva6dmzv3/image/upload/v1678471289/p4ya2vfuoxuy6cehiqox.png"
//             ],
//             "views": 2,
//             "coments": [],
//             "score": [],
//             "state": "sale",
//             "stock": "12",
//             "favorite": [],
//             "companyId": "63def89a96e705cd69d05ff3",
//             "__v": 0
//         },
//     ],
//     historialWithDate: [
//         {
//             "producto": "640b71649fceb0f7a0a76d29",
//             "date": "2023-03-18T19:34:07.169Z"
//         },
//     ]
// } 
    return res.status(200).json(
        {
            name:user.username,
            email:user.email,
            historial:user.historialInfinito,
            compras:user.compras,
            favorite:user.favorito,
            companies:user.companies,
            _id:user._id
        }
        );
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};

export const getHistorialUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    return res
      .status(200)
      .json({ historial: user.historialInfinito.slice(0, 5) });
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};
export const getHistorialInfinitoUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    return res.status(200).json({ historialInfinito: user.historialInfinito });
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};
export const getFavoritoUser = async (req, res) => {
  const id = req.user._id;
  console.log("limit", req.query.limit);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    return res
      .status(200)
      .json(
        req.query.limit
          ? { favoritos: user.favorito.slice(0, req.query.limit) }
          : { favoritos: user.favorito.map((e) => e._id) }
      );
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};
export const putFavoritoUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    let favorito = user.favorito;
    if (favorito.some((e) => e._id.toString() === req.body.producto)) {
      favorito = favorito.filter((e) => e._id.toString() !== req.body.producto);
    } else {
      favorito.unshift(req.body.producto);
    }
    user.favorito = favorito;
    await user.save();
    return res.status(200).json({ favorito: user.favorito.map((e) => e._id) });
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};
