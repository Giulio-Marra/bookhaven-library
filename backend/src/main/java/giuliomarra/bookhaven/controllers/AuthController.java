package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.payloads.LoginRequiredDto;
import giuliomarra.bookhaven.payloads.LoginTokenDto;
import giuliomarra.bookhaven.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("login")
    public LoginTokenDto loggin(@RequestBody @Valid LoginRequiredDto payload) {
        return new LoginTokenDto(authenticationService.generateToken(payload));
    }
}
