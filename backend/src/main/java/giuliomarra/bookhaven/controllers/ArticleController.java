package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Article;
import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.payloads.NewArticleRequiredDto;
import giuliomarra.bookhaven.services.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // CREA NUOVO ARTICOLO
    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Article> createArticle(@RequestBody NewArticleRequiredDto body,
                                                 @AuthenticationPrincipal Staff staff) {
        Article savedArticle = articleService.addNewArticle(body, staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    // TROVA ARTICOLO PER ID
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.findById(id);
        return ResponseEntity.ok(article);
    }

    // AGGIORNA ARTICOLO
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id,
                                                 @RequestBody NewArticleRequiredDto body) {
        Article updated = articleService.updateArticle(id, body);
        return ResponseEntity.ok(updated);
    }

    // CANCELLA ARTICOLO
    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }

    // LISTA TUTTI GLI ARTICOLI ORDINATI PER UPDATED AT CRESCENTE
    @GetMapping("/public/asc")
    public ResponseEntity<Page<Article>> getArticlesAsc(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(articleService.getAllArticlesOrderByUpdatedAsc(pageable));
    }

    // LISTA TUTTI GLI ARTICOLI ORDINATI PER UPDATED AT DECRESCENTE
    @GetMapping("/public/desc")
    public ResponseEntity<Page<Article>> getArticlesDesc(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(articleService.getAllArticlesOrderByUpdatedDesc(pageable));
    }

    // ULTIMI 5 ARTICOLI AGGIORNATI
    @GetMapping("/public/latest")
    public ResponseEntity<List<Article>> getLast5UpdatedArticles() {
        return ResponseEntity.ok(articleService.getLast5UpdatedArticles());
    }

    // FILTRA ARTICOLI PER INTERVALLO DI DATE
    @GetMapping("/public/updated-between")
    public ResponseEntity<Page<Article>> getArticlesByDateRange(
            @RequestParam("start") String start,
            @RequestParam("end") String end,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(start, formatter);
        LocalDateTime endDate = LocalDateTime.parse(end, formatter);
        Pageable pageable = PageRequest.of(page, size);

        Page<Article> articles = articleService.getArticlesByUpdatedAtRange(startDate, endDate, pageable);
        return ResponseEntity.ok(articles);
    }
}