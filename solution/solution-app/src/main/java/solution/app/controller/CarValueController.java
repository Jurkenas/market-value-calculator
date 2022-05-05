package solution.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import solution.app.data.ClientDiscountDTO;
import solution.app.data.carResultDTO;
import solution.app.service.CarValueService;
import solution.app.service.ClientService;
import solution.repository.entity.CarResult;
import solution.repository.entity.Client;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping(value = "/api/carValue")
@RequiredArgsConstructor
public class CarValueController {
    private final CarValueService carValueService;

    @GetMapping(value = "/getResults")
    public ResponseEntity<List<carResultDTO>> getQueryResults(@RequestParam Long query_id) {
    return ResponseEntity.ok(carValueService.getResults(query_id));
    }
    @GetMapping(value = "/all")
    public ResponseEntity<List<carResultDTO>> getAll() {
        return ResponseEntity.ok(carValueService.getAll());
    }
}
//    @PostMapping(value = "/discount")
//    public ResponseEntity<Void> storeClientDiscount(@RequestBody ClientDiscountDTO clientDiscountDTO) {
//        Client client = clientService.getExistingOrCreateNewClient(clientDiscountDTO.getClientId());
//        clientService.storeClientDiscount(client, clientDiscountDTO.getDiscountedPrice());
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping(value = "/discount/all")
//    public ResponseEntity<List<ClientDiscountDTO>> getAllDiscounted() {
//        return ResponseEntity.ok(clientService.getAllDiscountedClients());
//    }
//
//    @GetMapping(value = "/all")
//    public ResponseEntity<List<ClientDiscountDTO>> getAllClients() {
//        return ResponseEntity.ok(clientService.getAllClients());
//    }

