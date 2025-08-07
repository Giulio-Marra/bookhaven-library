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

    public AuthenticatedEntity findEntityByIdAndRole(Long id, Role role) {
        if (role == Role.STAFF) {
            return staffService.findStaffById(id);
        } else if (role == Role.USER) {
            return userService.findUserById(id);
        } else {
            throw new RoleNotSupportedException("Role not supported");
        }
    }

    public AuthenticatedEntity findEntityByCode(String code) {
        try {
            return staffService.findStaffByIdentityCode(code);
        } catch (EntityNotFoundException e) {
            return userService.findUserByCardCode(code);
        }
    }


    public String generateToken(LoginRequiredDto lr) {
        AuthenticatedEntity entity = findEntityByCode(lr.code());

        if (bcrypt.matches(lr.password(), entity.getPassword())) {
            return jwtTools.createToken(entity);
        } else {
            throw new AuthenticationException("Wrong credentials");
        }
    }

}
