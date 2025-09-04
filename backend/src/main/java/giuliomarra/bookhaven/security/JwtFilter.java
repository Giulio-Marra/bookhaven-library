package giuliomarra.bookhaven.security;

import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AuthenticationException;
import giuliomarra.bookhaven.services.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTool jwtTool;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new AuthenticationException("Please insert token");

        String accessToken = authHeader.substring(7);

        jwtTool.verifyToken(accessToken);

        Role role = jwtTool.extractRoleFromToken(accessToken);
        Long id = Long.parseLong(jwtTool.extractIdFromToken(accessToken));
        AuthenticatedEntity entity = authenticationService.findEntityByIdAndRole(id, role);

        Authentication authentication = new UsernamePasswordAuthenticationToken(entity, null, entity.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String servletPath = request.getServletPath();
        String requestURI = request.getRequestURI();

        // Log per debug - rimuovili dopo aver risolto
        System.out.println("=== JWT FILTER DEBUG ===");
        System.out.println("ServletPath: " + servletPath);
        System.out.println("RequestURI: " + requestURI);

        AntPathMatcher matcher = new AntPathMatcher();
        boolean shouldSkip = matcher.match("/auth/**", servletPath) ||
                matcher.match("/**/public/**", servletPath);

        System.out.println("Should skip filter: " + shouldSkip);
        System.out.println("========================");

        return shouldSkip;
    }
}
