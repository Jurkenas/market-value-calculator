package solution.repository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solution.repository.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findFirstByClientId(Long clientId);

    boolean existsByClientId(Long clientId);
}
