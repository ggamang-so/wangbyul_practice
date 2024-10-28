package egovframework.example.dao;

import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.CategoryDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleDao {

    List<ArticleDto> findAllArticle(int page, int pageSize) throws Exception;

    ArticleDto findById(int id);

    void deleteById(int id);

    void save(ArticleDto article);

    int returningId();

    void update(ArticleDto article);

    int totalArticleCount();

    List<CategoryDto> articleCountPerCategory();
}
