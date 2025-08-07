package giuliomarra.bookhaven.security;

import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AuthenticationException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTool {

    @Value("${jwt.secret}")
    private String secret;

    public String createToken(AuthenticatedEntity entity) {
        return Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .subject(String.valueOf(entity.getId()))
                .claim("role", entity.getRole().name())
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public void verifyToken(String token) {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);

        } catch (Exception ex) {
            throw new AuthenticationException("Problem with token, try to relog");
        }
    }

    public String extractIdFromToken(String token) {
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public Role extractRoleFromToken(String token) {
        try {
            var claims = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            Object roleObj = claims.get("role");

            if (roleObj == null) {
                throw new AuthenticationException("Token does not contain a 'role' claim.");
            }

            String roleStr = roleObj.toString().toUpperCase(); // safe

            return Role.valueOf(roleStr);

        } catch (Exception ex) {
            throw new AuthenticationException("Invalid or missing role in token: " + ex.getMessage());
        }
    }

}
