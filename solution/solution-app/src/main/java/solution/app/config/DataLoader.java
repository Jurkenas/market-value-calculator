package solution.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import solution.app.service.ClientService;
import solution.repository.entity.Client;

import java.math.BigDecimal;

@RequiredArgsConstructor
@Component
public class DataLoader implements ApplicationRunner {

    private final ClientService clientService;

    public void run(ApplicationArguments args) {
        Client client = clientService.getExistingOrCreateNewClient(42L);
        clientService.storeClientDiscount(client, BigDecimal.valueOf(0.05));
    }
}
