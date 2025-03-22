const nodemailer = require("nodemailer");

const sendEmail = async (user, activationUrl) => {
  try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true, // true for 465, false for other ports
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: process.env.SMPT_MAIL, // generated ethereal user
            pass: process.env.SMPT_PASSWORD, // generated ethereal password
        },
        tls:{
            rejectUnAuthorized:true
        }
    });

    await transporter.sendMail({
      from: process.env.SMPT_MAIL,
      to: user.email,
      subject: "Activate your account",
      text: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;