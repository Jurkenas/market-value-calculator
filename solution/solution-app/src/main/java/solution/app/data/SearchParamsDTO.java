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
    private Integer yearFrom;
    private Integer yearTo;
    private String mark;
    private String model;

}
