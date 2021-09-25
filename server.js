const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${req.body.name}: ${req.body.email}, ${req.body.phone}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error(error);
            res.send('error');
        } else{
            console.log('message sent');
            res.send('success');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!!`)
})