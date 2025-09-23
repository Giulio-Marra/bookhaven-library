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

    // Restituisce un articolo tramite ID o lancia eccezione se non trovato
    public Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article with id " + id + " not found"));
    }

    // Crea un nuovo articolo con autore e immagine casuale
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

    // Aggiorna un articolo esistente
    public Article updateArticle(Long id, NewArticleRequiredDto body) {
        Article article = findById(id);

        article.setTitle(body.title());
        article.setContent(body.content());
        article.setArticleType(body.articleType());
        article.setUpdatedAt(LocalDateTime.now());

        return articleRepository.save(article);
    }

    // Cancella un articolo tramite ID
    public void deleteArticle(Long id) {
        Article article = findById(id);
        articleRepository.delete(article);
    }

    // Recupera articoli aggiornati in un intervallo di date con paginazione
    public Page<Article> getArticlesByUpdatedAtRange(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return articleRepository.findByUpdatedAtBetweenOrderByUpdatedAtAsc(start, end, pageable);
    }

    // Recupera tutti gli articoli ordinati per data di aggiornamento crescente
    public Page<Article> getAllArticlesOrderByUpdatedAsc(Pageable pageable) {
        return articleRepository.findAllByOrderByUpdatedAtAsc(pageable);
    }

    // Recupera tutti gli articoli ordinati per data di aggiornamento decrescente
    public Page<Article> getAllArticlesOrderByUpdatedDesc(Pageable pageable) {
        return articleRepository.findAllByOrderByUpdatedAtDesc(pageable);
    }

    // Recupera gli ultimi 5 articoli aggiornati
    public List<Article> getLast5UpdatedArticles() {
        return articleRepository.findTop5ByOrderByUpdatedAtDesc();
    }

    // Recupera articoli filtrati per tipo e intervallo di date opzionali
    public Page<Article> getArticlesByFilters(ArticleType type, LocalDateTime start, LocalDateTime end, Pageable pageable) {
        LocalDateTime minDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        LocalDateTime maxDate = LocalDateTime.of(3000, 1, 1, 0, 0);

        if (start == null) start = minDate;
        if (end == null) end = maxDate;

        return articleRepository.findArticlesByOptionalFilters(type, start, end, pageable);
    }
}

