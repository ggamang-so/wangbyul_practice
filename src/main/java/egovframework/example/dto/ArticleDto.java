package egovframework.example.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

/**
 * @author : ggamangso
 * @packageName : egovframework.example.dto
 * @fileName : ArticleDto
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        ggamangso       최초 생성
 * </pre>
 */

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ArticleDto {
    private int id;
    private String title;
    private String content;
    private String memberId;
    private String category;
    private int categoryValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate createdAt;
    private boolean isAuthor;

}