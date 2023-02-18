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