package solution.repository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solution.repository.entity.CarQuery;
import solution.repository.entity.Client;

@Repository
public interface CarQueryRepository extends JpaRepository<CarQuery, Long> {
    CarQuery findFirstByQueId(Long queryId);
}
