package giuliomarra.bookhaven.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handlerEntityNotFound(EntityNotFoundException enf, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                enf.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(RoleNotSupportedException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handlerRoleNotFound(RoleNotSupportedException rns, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                rns.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerAuthentication(AuthenticationException aue, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                aue.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(AlreadyexistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerAlreadyexists(AlreadyexistsException ae, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ae.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(CardExpiredException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerCardExpire(CardExpiredException ce, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ce.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(BookNotAvailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handlerNotAvailable(BookNotAvailableException bna, HttpServletRequest request) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                bna.getMessage(),
                request.getRequestURI()
        );
    }
}
