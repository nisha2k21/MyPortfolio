const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // अपना Gmail पता यहाँ डालें
        pass: 'your-app-password'     // Gmail App Password यहाँ डालें (2FA के लिए)
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, interested, message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'nisha2k21gce@gmail.com',
        subject: `New Message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            Interested In: ${interested}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});