const nodemailer = require("nodemailer");

const sendMail = (mailTo, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const body = `
            <h2 style="font-family: 'Trebuchet MS', sans-serif;font-size: xx-large; color: #000;">
                Your OTP is: <strong>${otp}</strong>
            </h2>
        `;

    const mailOptions = {
        from: "SIH <noreply@sih.com>",
        to: mailTo,
        subject: "SIH OTP",
        html: body,
    };

    transporter.sendMail(mailOptions, (error) => {
        error && console.log(error);
    });
};

module.exports = sendMail;
