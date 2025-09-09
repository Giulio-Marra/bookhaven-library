package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Article;
import giuliomarra.bookhaven.enums.ArticleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository per gestire le operazioni sul database relative agli articoli (Article).
 * Estende JpaRepository, quindi eredita tutti i metodi CRUD.
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // Restituisce tutti gli articoli ordinati per data di aggiornamento in ordine crescente, paginati
    Page<Article> findAllByOrderByUpdatedAtAsc(Pageable pageable);

    // Restituisce tutti gli articoli ordinati per data di aggiornamento in ordine decrescente, paginati
    Page<Article> findAllByOrderByUpdatedAtDesc(Pageable pageable);

    // Restituisce articoli aggiornati in un intervallo di date, ordinati in modo crescente
    Page<Article> findByUpdatedAtBetweenOrderByUpdatedAtAsc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    // Restituisce i 5 articoli più recenti
    List<Article> findTop5ByOrderByUpdatedAtDesc();

    // Query personalizzata con filtri opzionali su tipo articolo e range di creazione
    @Query("""
            SELECT a FROM Article a
            WHERE (:type IS NULL OR a.articleType = :type)
              AND a.createdAt >= :start
              AND a.createdAt <= :end
            """)
    Page<Article> findArticlesByOptionalFilters(
            @Param("type") ArticleType type,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            Pageable pageable
    );
}
