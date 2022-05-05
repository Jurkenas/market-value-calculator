package solution.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import solution.app.data.ClientDiscountDTO;
import solution.app.service.ClientService;
import solution.repository.entity.Client;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping(value = "/api/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @PostMapping(value = "/discount")
    public ResponseEntity<Void> storeClientDiscount(@RequestBody ClientDiscountDTO clientDiscountDTO) {
        Client client = clientService.getExistingOrCreateNewClient(clientDiscountDTO.getClientId());
        clientService.storeClientDiscount(client, clientDiscountDTO.getDiscountedPrice());
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/discount/all")
    public ResponseEntity<List<ClientDiscountDTO>> getAllDiscounted() {
        return ResponseEntity.ok(clientService.getAllDiscountedClients());
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<ClientDiscountDTO>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }
}
