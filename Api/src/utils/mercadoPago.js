import mercadopago from "mercadopago";

import * as dotenv from 'dotenv'; 
dotenv.config()

export default mercadopago.configure({
    access_token:process.env.ACCESS_TOKEN,
});
