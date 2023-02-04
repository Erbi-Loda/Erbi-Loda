import Company from "../models/Company.js";
import { encrypt, compare } from "../helpers/bCrypt.js";
import { tokenSign } from "../helpers/generadorDeToken.js";


export const postCompany = async (req, res) => {
    try {
        function random(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        }
        const caracteres=['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M','1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        let arrayDePasswordCPUNuevo=[]
        function passwordcpucreador(){for (let i=0;i<15;i++){
            arrayDePasswordCPUNuevo.push(caracteres[random(0,62)])
        }}
        const { companyname, password, email } = req.body
        const passwordHash = await encrypt(password)
        passwordcpucreador()
        await Company.create({
            companyname: companyname,
            password: passwordHash,
            email: email,
            passwordCPU:arrayDePasswordCPUNuevo.join("")
        })
        return res.status(200).json("Usuario creado satisfactoriamente")
    } catch (e) {
        return res.json({ msg: `Error - ${e}` })
    }
}

export const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body
        const company = await Company.findOne({ email })
        if(!company) {
            return res.status(405).json({ msg: "Usario no encontrado" })
        }
        const checkPassword = await compare(password, company.password)
        const tokenSession = await tokenSign(company)
        if(!checkPassword) {
            return res.status(401).json({ msg: "Contraseña invalida" })
        }
        return res.status(200).json({token:tokenSession,id:company._id})
    } catch(e) {
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