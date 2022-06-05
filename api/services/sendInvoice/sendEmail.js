import nodemailer from "nodemailer";

export default async function sendEmail({user,pass,host,emailComposition}) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user, // 'invoice@gregorianrants.co.uk', // generated ethereal user
                pass //'6Bmjs4b-m', // generated ethereal password
            },
            tls: {rejectUnauthorized: false}
        });

        // send mail with defined transport object
        /*let info = await transporter.sendMail({
            from: '"invoice" <invoice@gregorianrants.co.uk>', // sender address
            to: "gregorian_rants@hotmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
            attachments: [
                {filename: 'invoice.docx',
                    content: attachment
                }
            ]
        });*/


    let info = await transporter.sendMail(emailComposition);
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
