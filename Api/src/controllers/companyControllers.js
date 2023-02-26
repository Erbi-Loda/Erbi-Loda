import Company from "../models/Company.js";
import User from "../models/User.js";
import { uuid } from 'uuidv4';

export const postCompany = async (req, res) => {
    try {       
        const { companyname,userId } = req.body
        const user = await User.findById(userId)
        await Company.create({
            companyname: companyname,
            creator:user._id,
            idPublic:uuid().split("-").join('')
        })
        return res.status(200).json("Usuario creado satisfactoriamente")
    } catch (e) {
        return res.json({ msg: `Error - ${e}` })
    }
}


export const getCompany = async (req, res) => {
    const { id } = req.params
    try {
        const company = await Company.findById(id)
        if(!company) {
            return res.status(405).send("Usuario no encontrado")
        }
        return res.status(200).json(company)
    } catch(e) {
        return res.status(404).send({ msg: `Error - ${e}` })
    }
}
