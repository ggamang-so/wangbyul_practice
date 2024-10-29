package egovframework.example.dto;

import egovframework.example.Const.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberArticleDto {
    private String memberId;
    private int count;
}
