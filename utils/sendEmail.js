import { createTransport } from "nodemailer";

const sendEmail = async (options) => {
    const transporter = createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
