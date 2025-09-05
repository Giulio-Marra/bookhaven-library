package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Article;
import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.enums.ArticleType;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewArticleRequiredDto;
import giuliomarra.bookhaven.repositories.ArticleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    // TROVA ARTICOLO PER ID
    public Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article with id " + id + " not found"));
    }

    // CREA NUOVO ARTICOLO
    public Article addNewArticle(NewArticleRequiredDto body, Staff articleAuthor) {
        String randomImageUrl = "https://picsum.photos/1200/600";

        Article article = new Article(
                body.title(),
                randomImageUrl,
                body.articleType(),
                body.content(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                articleAuthor
        );

        return articleRepository.save(article);
    }

    // AGGIORNA ARTICOLO
    public Article updateArticle(Long id, NewArticleRequiredDto body) {
        Article article = findById(id);

        article.setTitle(body.title());
        article.setContent(body.content());
        article.setArticleType(body.articleType());
        article.setUpdatedAt(LocalDateTime.now());

        return articleRepository.save(article);
    }

    // CANCELLA ARTICOLO
    public void deleteArticle(Long id) {
        Article article = findById(id);
        articleRepository.delete(article);
    }

    // RECUPERA ARTICOLI CON PAGINAZIONE E FILTRO PER INTERVALLO DI DATE
    public Page<Article> getArticlesByUpdatedAtRange(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return articleRepository.findByUpdatedAtBetweenOrderByUpdatedAtAsc(start, end, pageable);
    }

    // RECUPERA TUTTI GLI ARTICOLI IN ORDINE CRESCENTE PER UPDATED AT
    public Page<Article> getAllArticlesOrderByUpdatedAsc(Pageable pageable) {
        return articleRepository.findAllByOrderByUpdatedAtAsc(pageable);
    }

    // RECUPERA TUTTI GLI ARTICOLI IN ORDINE DECRESCENTE PER UPDATED AT
    public Page<Article> getAllArticlesOrderByUpdatedDesc(Pageable pageable) {
        return articleRepository.findAllByOrderByUpdatedAtDesc(pageable);
    }

    // RECUPERA GLI ULTIMI 5 ARTICOLI AGGIORNATI
    public List<Article> getLast5UpdatedArticles() {
        return articleRepository.findTop5ByOrderByUpdatedAtDesc();
    }

    public Page<Article> getArticlesByFilters(ArticleType type, LocalDateTime start, LocalDateTime end, Pageable pageable) {
        
        LocalDateTime minDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        LocalDateTime maxDate = LocalDateTime.of(3000, 1, 1, 0, 0);

        if (start == null) start = minDate;
        if (end == null) end = maxDate;

        return articleRepository.findArticlesByOptionalFilters(type, start, end, pageable);
    }


}
