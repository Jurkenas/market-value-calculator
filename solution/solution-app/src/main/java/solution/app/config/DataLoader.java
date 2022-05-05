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
//        CarResult carResult = new CarResult();
//        carResult.setDescription("AUDI A6");
//        carResult.setPrice(new BigDecimal("1000"));
//        carResult.setUrl("www.ld.lt");
//        carResult.setResQueId(1L);
//
//        List<CarResult> carResults= new ArrayList<>();
//        carResults.add(carResult);
//
//        CarResult carResult2 = new CarResult();
//        carResult2.setDescription("AUDI A6");
//        carResult2.setPrice(new BigDecimal("10000"));
//        carResult2.setUrl("www.ld.lt");
//        carResult2.setResQueId(1L);
//        carResults.add(carResult2);
//
//        CarResult carResult3 = new CarResult();
//        carResult3.setDescription("AUDI A6");
//        carResult3.setPrice(new BigDecimal("3000"));
//        carResult3.setUrl("www.ld.lt");
//        carResult3.setResQueId(2L);
//        carResults.add(carResult3);

//        carValueService.storeResultsDummyList(carValueService.getResults(2002, 2012, "Kia", "Sportage"));
        //     carValueService.storeResultsDummy(carResult);
//        Client client = clientService.getExistingOrCreateNewClient(42L);
//        clientService.storeClientDiscount(client, BigDecimal.valueOf(0.05));

    }
}

