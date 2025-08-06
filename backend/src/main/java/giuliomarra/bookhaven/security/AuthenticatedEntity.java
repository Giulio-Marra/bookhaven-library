package giuliomarra.bookhaven.security;

import giuliomarra.bookhaven.enums.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticatedEntity extends UserDetails {

    Long getId();

    Role getRole();
}
