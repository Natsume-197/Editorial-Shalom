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

export async function sendConfirmationEmail(name: string, email: string, token: string) {
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

export async function sendConfirmationShopEmail(name: string, email: string, id: string) {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Proceso de compra',
      html: `<h2>¡Hola, ${name}!</h2>
            <p>Gracias por realizar una compra. Pronto se comunicaran contigo para continuar el proceso de compra con id.</p>
            ${id}
            </div>`
    })
    .catch((err: any) => console.log(err))
}
export async function sendConfirmationShopEmailAdmin(id_user: string, id: string, cell: string) {
  transport
    .sendMail({
      from: user,
      to: user,
      subject: 'Proceso de compra',
      html: `<h2>¡Se ha registrado una compra nueva!</h2>
            <p>El usuario con id ${id_user} ha realizado una compra. Comunicate con él usuario para continuar con el proceso, numero de celular : ${cell}.</p>
            Numero de compra: ${id}
            </div>`
    })
    .catch((err: any) => console.log(err))
}
export async function sendResetPasswordEmail(name: string, email: string, token: string) {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Restablecer contraseña',
      html: `<h2>¡Hola, ${name}!</h2>
            <p>Para poder reestablecer la contraseña ingresa al siguiente link:</p>
            ${process.env.URL_SHALOM_FRONT}/account/resetpassword/${token}/
            </div>`
    })
    .catch((err: any) => console.log(err))
}

