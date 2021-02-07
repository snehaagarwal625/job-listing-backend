import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    async SendEmail(mailOption: any) {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                service : 'Gmail',
                
                auth: {
                  user: 'snehaagarwal625@gmail.com',
                  pass: 'sneha625',
                }
            });

            const info = await transporter.sendMail({
                from: mailOption.from,
                to: mailOption.to,
                subject: mailOption.subject,
                html: mailOption.html,
            });
        } catch (error) {
            console.log('Error whiles sending the mail');
        }
    }

    generateMailingInput(otp: number, toEmails: string): any {
        let mailOption: any = {};
        mailOption.subject = 'Otp for registration/login is:';
        mailOption.html = `<h3>OTP for account verification is: </h3><h1 style='font-weight:bold;'>${otp}</h1>`;
        mailOption.from = '"Sneha employee portal"<noreply-sneha-employee-portal@gmail.com>'
        mailOption.to = toEmails;
        return mailOption;
    }
}