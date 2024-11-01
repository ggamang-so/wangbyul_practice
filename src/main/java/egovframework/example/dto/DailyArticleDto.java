package egovframework.example.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class DailyArticleDto {
    private LocalDate date;
    private int count;
}
