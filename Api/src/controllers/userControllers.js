import User from "../models/User.js";
import { encrypt, compare } from "../helpers/bCrypt.js";
import { tokenSign } from "../helpers/generadorDeToken.js";
import { uuid } from 'uuidv4';


export const postUser = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const passwordHash = await encrypt(password)
        passwordcpucreador()
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
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(405).json({ msg: "Usario no encontrado" })
        }
        const checkPassword = await compare(password, user.password)
        const tokenSession = await tokenSign(user)
        if(!checkPassword) {
            return res.status(401).json({ msg: "Contraseña invalida" })
        }
        return res.status(200).send(tokenSession)
    } catch(e) {
        return res.json({ msg: `Error - ${e}` })
    }
}



export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(405).send("Usuario no encontrado")
        }
        return res.status(200).json({...user})
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}

export const getHistorialUser = async (req,res)=>{    
    const  id  = req.user._id
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(405).send("Usuario no encontrado")
        }
        return res.status(200).json({historial:user.historial})
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}
export const getHistorialInfinitoUser = async (req,res)=>{    
    const  id  = req.user._id
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(405).send("Usuario no encontrado")
        }
        return res.status(200).json({historialInfinito:user.historialInfinito})
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}
export const getFavoritoUser = async (req,res)=>{    
    const  id  = req.user._id
    console.log('limit',req.query.limit)
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(405).send("Usuario no encontrado")
        }
        return res.status(200).json(req.query.limit?{favoritos:user.favorito.slice(0,req.query.limit)}:{favoritos:user.favorito})
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}
export const putFavoritoUser = async (req,res)=>{    
    const  id  = req.user._id
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(405).send("Usuario no encontrado")
        }
        let favorito = user.favorito
       if(favorito.some(e=>e.toString()===req.body.producto)) {favorito=favorito.filter(e=>e.toString()!==req.body.producto)}
       else{favorito.unshift(req.body.producto)}
       user.favorito=favorito
       await user.save()
        return res.status(200).json({favorito:user.favorito})
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}