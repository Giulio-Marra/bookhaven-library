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

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Articoli in ordine crescente per data aggiornamento
    Page<Article> findAllByOrderByUpdatedAtAsc(Pageable pageable);

    // Articoli in ordine decrescente per data aggiornamento
    Page<Article> findAllByOrderByUpdatedAtDesc(Pageable pageable);

    // Articoli in un intervallo di date aggiornati (crescente)
    Page<Article> findByUpdatedAtBetweenOrderByUpdatedAtAsc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    // Ultimi 5 articoli aggiornati
    List<Article> findTop5ByOrderByUpdatedAtDesc();

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
