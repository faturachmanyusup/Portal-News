const mailgun = require("mailgun-js");
var api_key = process.env.APIMAILGUN;
const DOMAIN = process.env.DOMAINMAILGUN;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

async function sendEmail(receiver,subject,text) {
    const data = {
        from: 'Portal News Team <mayanafitri25@gmail.com>',
        to: `${receiver}`,
        subject: subject,
        text: text
    };
    
    await mg.messages().send(data, function (error, body) {
        if (error) {
            throw error
        } else {
            console.log(body)
        }
    });
}


module.exports = sendEmail

// usage:
// const sendEmail = require(`../helpers/mailgun`)
// let subject = `Successfully Registered to Portal News!`
// let text = `Welcome ${data.email} to Portal News!\n We hope, we can be your best buddy in terms of your source choice for everything happens around you.\n Have a good day!\n\n Cheers.`
// sendEmail(data.email, subject, text)