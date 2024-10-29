package egovframework.example.dao;

import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.CategoryDto;
import egovframework.example.dto.DailyArticleDto;
import egovframework.example.dto.MemberArticleDto;
import egovframework.example.vo.PageVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleDao {

    List<ArticleDto> findAllArticle(PageVo pageVo) throws Exception;

    ArticleDto findById(int id);

    void deleteById(int id);

    void save(ArticleDto article);

    int returningId();

    void update(ArticleDto article);

    int totalArticleCount(PageVo pageVo);

    List<CategoryDto> articleCountPerCategory();

    List<MemberArticleDto> articleCountPerMemberId();

    List<DailyArticleDto> articleCountDaily();
}
