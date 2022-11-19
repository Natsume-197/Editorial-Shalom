const nodemailer = require('nodemailer')

const user = process.env.EMAIL_SERVICE
const pass = process.env.PASSWORD_EMAIL_SERVICE

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: pass
  }
})

async function sendConfirmationEmail(name: string, email: string, token: string) {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Verificación de Correo',
      html: `<h2>¡Hola, ${name}!</h2>
            <p>Gracias por registrarte. Por favor, confirma tu correo haciendo click en el siguiente link:</p>
            ${process.env.URL_SHALOM_FRONT}/account/verify/${token}/
            </div>`
    })
    .catch((err: any) => console.log(err))
}

export default sendConfirmationEmail
