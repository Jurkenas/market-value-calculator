package solution.repository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solution.repository.entity.CarResult;
import solution.repository.entity.Client;

import java.util.List;

@Repository
public interface CarResultRepository extends JpaRepository<CarResult, Long> {
    List<CarResult> getAllByResQueId(Long id);


//    boolean existsByClientId(Long clientId);
}
