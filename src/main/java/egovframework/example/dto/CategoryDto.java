package egovframework.example.dto;

import egovframework.example.Const.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CategoryDto {
    private String categoryDisplayName;
    private int category;
    private int count;

    public static CategoryDto of(CategoryDto dto){
        dto.setCategoryDisplayName(Category.getDisplayName(dto.category));
        return dto;
    }




}
