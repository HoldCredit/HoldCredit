package com.holdcredit.holdcredit.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class EmailSender {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTemporaryPassword(String recipientEmail, String temporaryPassword) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.naver.com");
        props.put("mail.smtp.port", "465");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("smwkdiek@naver.com", "u@1771001516");
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("smwkdiek@naver.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
            message.setSubject("임시 비밀번호");
            message.setText("임시 비밀번호: " + temporaryPassword);

            // 이메일 내용을 HTML 형식으로 설정
            String emailContent = "<html>"
                    + "<head>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; background-color: #f1f1f1; }"
                    + ".container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }"
                    + "h2 { color: #333333; }"
                    + "p { color: #666666; }"
                    + "strong { font-weight: bold; }"
                    + ".password-box { background-color: #f9f9f9; padding: 10px; border-radius: 3px; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div style='background-color: #f1f1f1; padding: 20px;'>"
                    + "<div class='container'>"
                    + "<h2>임시 비밀번호 안내</h2>"
                    + "<p>안녕하세요,</p>"
                    + "<p>HoldCredit 임시 비밀번호를 안내해드립니다. 아래의 임시 비밀번호를 사용하여 로그인하세요.</p>"
                    + "<br>"
                    + "<div class='password-box' style='border: 2px solid #3333FF; padding: 10px; border-radius: 5px; width: 300px; margin: 0; text-align: left;'>"
                    + "<strong>임시 비밀번호:</strong> " + temporaryPassword
                    + "</div>"
                    + "<br>"
                    + "<p>보안을 위해 임시 비밀번호를 사용한 후에는 즉시 비밀번호를 변경해주시기 바랍니다.</p>"
                    + "<p>감사합니다.</p>"
                    + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            message.setContent(emailContent, "text/html; charset=utf-8");
            Transport.send(message);

            System.out.println("임시 비밀번호 이메일이 성공적으로 전송되었습니다.");
        } catch (MessagingException e) {
            System.err.println("임시 비밀번호 이메일 전송에 실패하였습니다.");
            e.printStackTrace();
        }
    }
}
