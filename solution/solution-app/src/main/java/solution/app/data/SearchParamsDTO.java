package solution.app.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class SearchParamsDTO {
    private Long yearFrom;
    private Long yearTo;
    private String make;
    private String model;
    private String bodyType;
    private String fuel;
    private String gearBox;


}
