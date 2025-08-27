package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.security.AuthenticatedEntity;
import giuliomarra.bookhaven.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // L'utente può vedere i propri dati
    @GetMapping("/me")
    public ResponseEntity<AuthenticatedEntity> getMyProfile(@AuthenticationPrincipal AuthenticatedEntity entity) {
        return ResponseEntity.ok(entity);
    }

    // L'utente può cambiare la propria password
    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/me/password")
    public ResponseEntity<Void> changeMyPassword(@AuthenticationPrincipal User userLogged,
                                                 @RequestBody String newPassword) {
        userService.updateUserPassword(userLogged, newPassword);
        return ResponseEntity.noContent().build();
    }
}
