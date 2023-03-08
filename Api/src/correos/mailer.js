import nodemailer from "nodemailer";

//         (para quien, que asunto, que mensaje de plantilla)
export const sendEmail = async (emailTo,emailSub,emailPlant,emailText = "") => {
  // const plantilla = `<div style='background-color: green; color:blue'>
  //         <h1>Esto es un ejemplo en plantillas</h1>
  //         <strong>BIENVENIDO A ERBILODA!</strong>
  //         <p>
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta
  //           deserunt consequuntur eum dolorem veritatis quisquam dicta expedita
  //           provident. Recusandae tempora, quod quisquam nesciunt molestiae alias et
  //           deserunt fugiat aspernatur.
  //         </p>
  //       </div>`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_ERBILODA,
      pass: process.env.PASS_ERBILODA,
    },
  });

  switch (emailPlant) {
    case 'welcome':
      emailPlant = `<div>
            <h1>Bienvenido a ErbiLoda</h1>
          </div>`;
      break;
    case 'login':
      emailPlant =` 
        <div>
          <h1>Bienvenido al logueo</h1>
        </div>
      `
      break;
    case 'deslogin':
      emailPlant =`
        <div>
          <h1>Adios, vuelve pronto</h1>
        </div>`

      break;
    default:
      console.log("No se definio una plantilla para...", emailPlant);
      break;
  }
  const mailOption = {
    from: process.env.EMAIL_ERBILODA, // sender address
    to: emailTo, // list of receivers
    subject: emailSub, // Subject line
    text: emailText, // plain text body
    html: emailPlant, // html body
  };

  let info = await transporter.sendMail(mailOption, (err, inf) => {
    if (err) console.log("Error>", err);
    else {
      console.log("Email Enviado.");
    }
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
