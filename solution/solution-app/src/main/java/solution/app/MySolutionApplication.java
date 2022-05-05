package solution.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"solution"})
@EnableJpaRepositories("solution")
@EntityScan("solution")
public class MySolutionApplication {

    public static void main(String[] args) {
        SpringApplication.run(MySolutionApplication.class, args);
    }
}

