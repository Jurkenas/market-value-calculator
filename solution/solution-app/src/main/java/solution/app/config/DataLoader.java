package solution.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import solution.app.service.CarValueService;
import solution.repository.entity.CarResult;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class DataLoader implements ApplicationRunner {

    private final CarValueService carValueService;

    public void run(ApplicationArguments args) throws IOException {
    }
}

