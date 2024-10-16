package egovframework.example.dao;

import egovframework.example.dto.ArticleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleDao {

    List<ArticleDto> findAllArticle();

    ArticleDto findById(int id);

    void deleteById(int id);

    void save(ArticleDto article);

    int returningId();

    void update(ArticleDto article);
}
