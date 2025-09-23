package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AuthenticationException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.exceptions.RoleNotSupportedException;
import giuliomarra.bookhaven.payloads.LoginRequiredDto;
import giuliomarra.bookhaven.security.AuthenticatedEntity;
import giuliomarra.bookhaven.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private StaffService staffService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTool jwtTools;

    @Autowired
    private PasswordEncoder bcrypt;

    // Restituisce l'entità (Staff o User) dato ID e ruolo; lancia eccezione se ruolo non supportato
    public AuthenticatedEntity findEntityByIdAndRole(Long id, Role role) {
        if (role == Role.STAFF || role == Role.DEMO) {
            return staffService.findStaffById(id);
        } else if (role == Role.USER) {
            return userService.findUserById(id);
        } else {
            throw new RoleNotSupportedException("Role not supported");
        }
    }

    // Cerca un'entità tramite codice; prima Staff, se non trovato prova User
    public AuthenticatedEntity findEntityByCode(String code) {
        try {
            return staffService.findStaffByIdentityCode(code);
        } catch (EntityNotFoundException e) {
            return userService.findUserByCardCode(code);
        }
    }

    // Genera un token JWT se le credenziali sono corrette; altrimenti lancia AuthenticationException
    public String generateToken(LoginRequiredDto lr) {
        AuthenticatedEntity entity = findEntityByCode(lr.code());

        if (bcrypt.matches(lr.password(), entity.getPassword())) {
            return jwtTools.createToken(entity);
        } else {
            throw new AuthenticationException("Wrong credentials");
        }
    }
}