package solution.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import solution.app.data.QueryResultDTO;
import solution.app.data.SearchParamsDTO;
import solution.app.data.CarResultDTO;
import solution.app.service.CarValueService;

import java.io.IOException;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping(value = "/api/car-value")
@RequiredArgsConstructor
public class CarValueController {
    private final CarValueService carValueService;

    @GetMapping("/get-results")
    public ResponseEntity<QueryResultDTO> getQueryResults(@RequestParam Long query_id) {
        return ResponseEntity.ok(carValueService.getResults(query_id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CarResultDTO>> getAll() {
        return ResponseEntity.ok(carValueService.getAll());
    }

    @PostMapping("/call-data")
    public ResponseEntity<QueryResultDTO> getData(@RequestBody SearchParamsDTO searchParamsDTO) throws IOException {
        return ResponseEntity.ok(carValueService.saveResults(searchParamsDTO));
    }


}


