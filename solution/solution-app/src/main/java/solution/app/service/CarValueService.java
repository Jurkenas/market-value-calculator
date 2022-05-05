package solution.app.service;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import solution.app.data.SearchParamsDTO;
import solution.app.data.carResultDTO;
import solution.repository.entity.CarQuery;
import solution.repository.entity.CarResult;
import solution.repository.repository.CarQueryRepository;
import solution.repository.repository.CarResultRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.UUID.randomUUID;

@Service
@RequiredArgsConstructor
public class CarValueService {


    private final CarQueryRepository carQueryRepository;
    private final CarResultRepository carResultRepository;


    public List<carResultDTO> getResults(Long queryId) {
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

    private String getUrl(Integer yearFrom, Integer yearTo, String mark, String model) {
        int x = 0;
        StringBuilder urlBuilder = new StringBuilder();
        String and = "&";
        String baseUrl = "https://autogidas.lt/skelbimai/automobiliai/?";


        urlBuilder.append(baseUrl);
        if (yearFrom != null) {
            String queryYearFrom = "f_41=" + yearFrom;
            urlBuilder.append(queryYearFrom);
            x++;
        }
        if (yearTo != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryYearTo = "f_42=" + yearTo;
            urlBuilder.append(queryYearTo);
            x++;
        }
        if (mark != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryMark = "f_1[0]=" + mark;
            urlBuilder.append(queryMark);
            x++;
        }
        if (model != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryModel = "f_model_14[0]=" + model;
            urlBuilder.append(queryModel);
            x++;
        }
        return urlBuilder.toString();
    }

    public List<CarResult> getResults(Long queryId, Integer yearFrom, Integer yearTo, String mark, String model) throws IOException {
        org.jsoup.nodes.Document doc = Jsoup.connect(getUrl(yearFrom, yearTo, mark, model))
                .timeout(6000).get();

        Elements body = doc.select("section.container");

        List<String> priceList = new ArrayList<>();
        List<String> aboutList = new ArrayList<>();
        List<String> urlList = new ArrayList<>();


        for (Element e : body.select("div.item-price")) {
            String price = e.select("meta").attr("content");
            if (price == "") {
                priceList.add("0");
            } else
                priceList.add(price);

        }


        for (Element e : body.select("div.item-description")) {
            String km = e.select("h3.primary").text() + ", " + e.select("h4.secondary").text();
            aboutList.add(km);
        }


        for (Element e : body.select("article.list-item")) {
            String URL = "https://autogidas.lt/" + (e.select("a").attr("href"));
            urlList.add(URL);
        }

        List<CarResult> carList = new ArrayList<>();

        for (int i = 0; i < priceList.size(); i++) {
            CarResult car = new CarResult();
            car.setPrice(new BigDecimal(priceList.get(i)));
            car.setDescription(aboutList.get(i));
            car.setUrl(urlList.get(i));
            car.setResQueId(queryId);
            carList.add(car);
        }


        return carList;
    }

    public Long saveResults(SearchParamsDTO searchParamsDTO) {
        Long queryId = saveCarQuery(searchParamsDTO.getYearFrom(), searchParamsDTO.getYearTo(), searchParamsDTO.getMark(), searchParamsDTO.getModel());
        try {
            storeResultsDummyList(getResults(queryId, searchParamsDTO.getYearFrom(), searchParamsDTO.getYearTo(), searchParamsDTO.getMark(), searchParamsDTO.getModel()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return queryId;
    }

    public Long saveCarQuery(Integer yearFrom, Integer yearTo, String mark, String model) {
        CarQuery carQuery = new CarQuery();
        carQuery.setMakeDateFrom(Long.valueOf(yearFrom));
        carQuery.setMakeDateTo(Long.valueOf(yearTo));
        carQuery.setMake(mark);
        carQuery.setModel(model);
        CarQuery savedQuery =  carQueryRepository.saveAndFlush(carQuery);
        return savedQuery.getQueId();
    }


    }
