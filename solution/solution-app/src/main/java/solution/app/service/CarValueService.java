package solution.app.service;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import solution.app.data.QueryResultDTO;
import solution.app.data.SearchParamsDTO;
import solution.app.data.CarResultDTO;
import solution.repository.entity.CarQuery;
import solution.repository.entity.CarResult;
import solution.repository.repository.CarQueryRepository;
import solution.repository.repository.CarResultRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarValueService {


    private final CarQueryRepository carQueryRepository;
    private final CarResultRepository carResultRepository;


    public QueryResultDTO getResults(Long queryId) {
        return getQueryResult(carResultRepository.getAllByResQueId(queryId).stream()
                .map(result ->
                        CarResultDTO.builder()
                                .key(result.getRes_id())
                                .description(result.getDescription())
                                .price(result.getPrice())
                                .url(result.getUrl())
                                .build())
                .collect(Collectors.toList()), queryId);
    }

    public List<CarResultDTO> getAll() {
        return carResultRepository.findAll().stream().map(result ->
                        CarResultDTO.builder()
                                .key(result.getRes_id())
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


    private String getUrl(Long yearFrom, Long yearTo, String mark, String model, String bodyType, String fuel, String gearBox, Integer pageNumber) {

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
        if (pageNumber != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryPageNumber = "page=" + pageNumber;
            urlBuilder.append(queryPageNumber);
            x++;
        }
        if (bodyType != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryBodyType = "f_3[]=" + bodyType;
            urlBuilder.append(queryBodyType);
            x++;
        }
        if (fuel != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryFuel = "f_2[]=" + fuel;
            urlBuilder.append(queryFuel);
            x++;
        }
        if (gearBox != null) {
            if (x != 0) {
                urlBuilder.append(and);
            }
            String queryGearBox = "f_10=" + gearBox;
            urlBuilder.append(queryGearBox);
            x++;
        }
//        f_3[]=Sedanas&f_2[]=Dyzelinas&f_10=Automatin??

        return urlBuilder.toString();
    }

    private List<CarResult> getResultWithUrl(Long queryId, Long yearFrom, Long yearTo, String mark, String model,String bodyType, String fuel, String gearBox, Integer pageNumber) throws IOException {
        org.jsoup.nodes.Document doc = Jsoup.connect(getUrl(yearFrom, yearTo, mark, model, bodyType, fuel, gearBox, pageNumber))
                .timeout(6000).get();

        Elements body = doc.select("section.container");

        List<String> priceList = new ArrayList<>();
        List<String> aboutList = new ArrayList<>();
        List<String> urlList = new ArrayList<>();


        for (Element e : body.select("div.item-price")) {
            String price = e.select("div").text();
            price = price.replaceAll("[^\\d.]", "");
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

    public List<CarResult> getResults(Long queryId, Long yearFrom, Long yearTo, String mark,String model,String bodyType, String fuel, String gearBox) throws IOException {

        List<CarResult> allCars =new ArrayList<>();
        List<CarResult> tmpList;

        for (int i = 1; i < 1000 ; i++) {
            tmpList=getResultWithUrl(queryId,yearFrom,yearTo,mark,model,bodyType, fuel, gearBox, i);
            if(tmpList.size()>0){
                allCars.addAll(tmpList);
            }else break;
        }
        return allCars;
    }

    public QueryResultDTO saveResults(SearchParamsDTO searchParamsDTO) {
        Long queryId = saveCarQuery(searchParamsDTO.getYearFrom(), searchParamsDTO.getYearTo(), searchParamsDTO.getMake(), searchParamsDTO.getModel(),searchParamsDTO.getBodyType(), searchParamsDTO.getFuel(), searchParamsDTO.getGearBox());
        try {
            storeResultsDummyList(getResults(queryId ,searchParamsDTO.getYearFrom(), searchParamsDTO.getYearTo(), searchParamsDTO.getMake(), searchParamsDTO.getModel(), searchParamsDTO.getBodyType(), searchParamsDTO.getFuel(), searchParamsDTO.getGearBox()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return getResults(queryId);
    }

    public Long saveCarQuery(Long yearFrom, Long yearTo, String mark, String model, String bodyType, String fuel, String gearBox ) {
        CarQuery carQuery = new CarQuery();
        carQuery.setMakeDateFrom(yearFrom);
        carQuery.setMakeDateTo(yearTo);
        carQuery.setMake(mark);
        carQuery.setModel(model);
        carQuery.setBodyType(bodyType);
        carQuery.setFuel(fuel);
        carQuery.setGearBox(gearBox);
        CarQuery savedQuery =  carQueryRepository.saveAndFlush(carQuery);
        return savedQuery.getQueId();
    }

    private BigDecimal getAverage(List<CarResultDTO> carResultDTO){
        int counter=0;
        int allCars=0;
        BigDecimal sum=BigDecimal.ZERO;
        BigDecimal average=BigDecimal.ZERO;
        BigDecimal tmp=BigDecimal.ZERO;
        MathContext m = new MathContext(0);

        for (int i = 0; i < carResultDTO.size(); i++) {

            if (carResultDTO.get(i).getPrice().intValue()!=0){
                tmp = carResultDTO.get(i).getPrice();
                sum=sum.add(tmp);
            }else {
                counter++;
            }
        }
        allCars=carResultDTO.size() - counter;

        if (allCars!=0){
        average=sum.divide(BigDecimal.valueOf(allCars), 0, RoundingMode.HALF_UP);
        }

        return average;
    }
    public QueryResultDTO getQueryResult(List<CarResultDTO> carResultDTO, Long queryId){
        QueryResultDTO queryResult = new QueryResultDTO();
        queryResult.setAveragePrice(getAverage(carResultDTO));
        queryResult.setCarList(carResultDTO);


        CarQuery carQuery=carQueryRepository.findFirstByQueId(queryId);
        queryResult.setSearchParams(SearchParamsDTO.builder()
                        .yearFrom(carQuery.getMakeDateFrom())
                        .yearTo(carQuery.getMakeDateTo())
                        .make(carQuery.getMake())
                        .model(carQuery.getModel())
                        .bodyType(carQuery.getBodyType())
                        .fuel(carQuery.getFuel())
                        .gearBox(carQuery.getGearBox())
                .build());
        return queryResult;
    }


    }
