package egovframework.example.service;

import egovframework.example.dao.ArticleDao;
import egovframework.example.dto.ArticleDto;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : ggamangso
 * @packageName : egovframework.example.service
 * @fileName : ArticlesService
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        ggamangso       최초 생성
 * </pre>
 */


@Service
public class ArticleService {

    private final ArticleDao articleDao;

    public ArticleService(ArticleDao articleDao) {
        this.articleDao = articleDao;
    }

    public List<ArticleDto> getArticleList() {
       return articleDao.findAllArticle();
    }

    public ArticleDto getArticle(long id){
        return articleDao.findById(id);
    }


}
