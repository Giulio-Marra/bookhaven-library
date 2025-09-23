package giuliomarra.bookhaven.config;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.repositories.StaffRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DemoDataConfig {

    private final StaffRepository staffRepository;
    private final PasswordEncoder bcrypt;

    public DemoDataConfig(StaffRepository staffRepository, PasswordEncoder bcrypt) {
        this.staffRepository = staffRepository;
        this.bcrypt = bcrypt;
    }

    // Inizializza account demo staff all'avvio dell'applicazione
    @Bean
    public CommandLineRunner initDemoStaff() {
        return args -> {
            String demoIdentityCode = "BookHavenDemo";

            if (!staffRepository.existsByIdentityCode(demoIdentityCode)) {
                Staff demoStaff = new Staff(
                        "Demo",
                        "Account",
                        demoIdentityCode,
                        "demo@bookhaven.com",
                        "0000000000",
                        bcrypt.encode("BookHavenDemoPassword"),
                        LocalDate.now(),
                        null,
                        true,
                        Role.DEMO
                );

                staffRepository.save(demoStaff);
                System.out.println("Demo staff account created");
            } else {
                System.out.println("Demo staff account already exists");
            }
        };
    }
}
