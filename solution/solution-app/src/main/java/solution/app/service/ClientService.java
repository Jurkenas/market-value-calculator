package solution.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solution.app.data.ClientDiscountDTO;
import solution.repository.entity.Client;
import solution.repository.repository.ClientRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public Client getExistingOrCreateNewClient(Long clientId) {
        Client client = null;
        if (clientId != null) {
            if (clientRepository.existsByClientId(clientId)) {
                client = clientRepository.findFirstByClientId(clientId);
                return client;
            } else {
                client = new Client();
                client.setClientId(clientId);
                clientRepository.saveAndFlush(client);
                return client;
            }
        }
        return client;
    }

    public void storeClientDiscount(Client client, BigDecimal discountedPrice) {
        client.setDiscountedPrice(discountedPrice);
        clientRepository.saveAndFlush(client);
    }

    public List<ClientDiscountDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(client -> new ClientDiscountDTO(client.getClientId(), client.getDiscountedPrice()))
                .toList();
    }

    public List<ClientDiscountDTO> getAllDiscountedClients() {
        return clientRepository.findAll().stream()
                .filter(client -> client.getDiscountedPrice() != null)
                .map(client -> new ClientDiscountDTO(client.getClientId(), client.getDiscountedPrice()))
                .toList();
    }

}
