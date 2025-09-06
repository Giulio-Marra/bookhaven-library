package giuliomarra.bookhaven.services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import giuliomarra.bookhaven.exceptions.CantSandEmailException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.sender.email}")
    private String senderEmail;


    public void sendRegistrationEmail(String to, String cardNumber, String rawPassword) {
        try {
            Email from = new Email(senderEmail);
            String subject = "Benvenuto su BookHaven!";
            Email toEmail = new Email(to);

            String textContent = "Ciao,\n\n" +
                    "Il tuo account è stato creato con successo.\n" +
                    "Numero tessera: " + cardNumber + "\n" +
                    "Password temporanea: " + rawPassword + "\n\n" +
                    "Ti consigliamo di cambiarla al primo accesso.";

            Content content = new Content("text/plain", textContent);
            Mail mail = new Mail(from, subject, toEmail, content);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();

            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            sg.api(request);

        } catch (Exception e) {
            throw new CantSandEmailException("Impossibile inviare email a " + to);
        }
    }
}
