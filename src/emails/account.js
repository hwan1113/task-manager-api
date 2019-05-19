const sgMail = require('@sendgrid/mail')
//다음과 같이 api키가 바로 js안에 있는건 좋지 않음. 그래서 교체할것임.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail=(email, name)=>{
    sgMail.send({
            to: email,
            from:'fernando11@naver.com',
            subject: 'Thanks for joining in',
            text: `Welcome to the app ${name}, Let me know how you get along`
        })
}
const sendFarewellEmail=(email, name)=>{
    sgMail.send({
        to: email,
        from:'fernando11@naver.com',
        subject: 'Hope to see again!',
        text: `Thank you for using our sevice ${name}, Let us know the reason for your goodbye`
    })
}

module.exports={
    sendWelcomeEmail,
    sendFarewellEmail
}