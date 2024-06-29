
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD
  }
});



const sendMenuOrderMail = async ({ orderDetails }) => {
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: process.env.NODE_MAILER_ALERT_EMAIL,
      subject: 'New Menu Order',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="background-color: rgb(224, 130, 15); padding: 20px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 24px;">New Menu Order</h2>
            </div>
            <div style="padding: 20px;">
              <h3 style="margin-bottom: 20px; color: rgb(224, 130, 15);">Order Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.contact}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Order:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.order}</td>
                </tr>
              </table>
              <p style="font-size: 14px; color: #888; margin-top: 20px;">This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      `
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

};

  





module.exports = {
    sendMenuOrderMail
}