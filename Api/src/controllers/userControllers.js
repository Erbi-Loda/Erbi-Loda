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
    const user = await User.findById(id).populate({
      path:'historialInfinito',
      options: {
          limit: 5
      }
  });
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    return res
      .status(200)
      .json({ historial: user.historialInfinito });
  } catch (e) {
    return res.status(404).send({ msg: `Error - ${e}` });
  }
};
export const getHistorialInfinitoUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id).populate({path: 'historialInfinito'});
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
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(405).send("Usuario no encontrado");
    }
    return res
      .status(200)
      .json(
        req.query.limit
          ? { favoritos: user.favorito.slice(0, req.query.limit).map((e) => e.toString() )}
          : { favoritos: user.favorito.map((e) => e.toString()) }
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
