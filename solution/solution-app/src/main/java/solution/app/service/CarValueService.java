package solution.app.service;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import solution.app.data.ClientDiscountDTO;
import solution.app.data.carResultDTO;
import solution.repository.entity.CarQuery;
import solution.repository.entity.CarResult;
import solution.repository.entity.Client;
import solution.repository.repository.CarQueryRepository;
import solution.repository.repository.CarResultRepository;
import solution.repository.repository.ClientRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarValueService {


    private final CarQueryRepository carQueryRepository;
    private final CarResultRepository carResultRepository;


    public List <carResultDTO> getResults (Long queryId){
        return carResultRepository.getAllByResQueId(queryId).stream()
                .map(result ->
                carResultDTO.builder()
                .description(result.getDescription())
                        .price(result.getPrice())
                        .url(result.getUrl())
                        .build())
                .collect(Collectors.toList());
      //  return new ArrayList<carResultDTO>();
    }
    public List<carResultDTO> getAll() {
        return carResultRepository.findAll().stream().map(result ->
                carResultDTO.builder()
                        .description(result.getDescription())
                        .price(result.getPrice())
                        .url(result.getUrl())
                        .build())
                .collect(Collectors.toList());
    }
    public void storeResultsDummyList(List<CarResult> results) {
        results.stream().forEach(result -> carResultRepository.saveAndFlush(result));
    }
    public void storeResultsDummy(CarResult result) {
        carResultRepository.saveAndFlush(result);
    }

    public List<CarResult> getResults() throws IOException {
        org.jsoup.nodes.Document doc= Jsoup.connect("https://autogidas.lt/skelbimai/automobiliai/?f_1[0]=Kia&f_model_14[0]=Sportage&s=1358479306")
                .timeout(6000).get();

        Elements body=doc.select("section.container");

        List<String> priceList = new ArrayList<>();
        List<String> aboutList = new ArrayList<>();
        List<String> urlList = new ArrayList<>();


        for (Element e: body.select("div.item-price")) {
            String price = e.select("meta").attr("content");
            if (price==""){
                priceList.add("0");
            }else
                priceList.add(price);

        }

        System.out.println(priceList);

        for (Element e: body.select("div.item-description")) {
            String km = e.select("h3.primary").text() + ", "+ e.select("h4.secondary").text();
            aboutList.add(km);
        }

        System.out.println(aboutList);




        for (Element e: body.select("article.list-item")) {
            String URL ="https://autogidas.lt/" + (e.select("a").attr("href"));
            urlList.add(URL);
        }

        List<CarResult> carList=new ArrayList<>();

        for (int i = 0; i < priceList.size(); i++) {
            CarResult car= new CarResult();
            car.setPrice(new BigDecimal(priceList.get(i)));
            car.setDescription(aboutList.get(i));
            car.setUrl(urlList.get(i));
            carList.add(car);
        }

//        System.out.println(aboutList.size());
//        System.out.println(carList.size());
//        System.out.println(carList);


        return carList;
    }

//    public Client getExistingOrCreateNewClient(Long clientId) {
//        Client client = null;
//        if (clientId != null) {
//            if (clientRepository.existsByClientId(clientId)) {
//                client = clientRepository.findFirstByClientId(clientId);
//                return client;
//            } else {
//                client = new Client();
//                client.setClientId(clientId);
//                clientRepository.saveAndFlush(client);
//                return client;
//            }
//        }
//        return client;
//    }
//
//    public void storeClientDiscount(Client client, BigDecimal discountedPrice) {
//        client.setDiscountedPrice(discountedPrice);
//        clientRepository.saveAndFlush(client);
//    }
//
//    public List<ClientDiscountDTO> getAllClients() {
//        return clientRepository.findAll().stream()
//                .map(client -> new ClientDiscountDTO(client.getClientId(), client.getDiscountedPrice()))
//                .toList();
//    }
//
//    public List<ClientDiscountDTO> getAllDiscountedClients() {
//        return clientRepository.findAll().stream()
//                .filter(client -> client.getDiscountedPrice() != null)
//                .map(client -> new ClientDiscountDTO(client.getClientId(), client.getDiscountedPrice()))
//                .toList();
//    }



}
