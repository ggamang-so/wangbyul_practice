package egovframework.example.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class PageVo {
    private int page;
    private int pageSize;
    private String searchField;
    private Object searchValue;
}
