package egovframework.example.service;

import egovframework.example.dao.ArticleDao;
import egovframework.example.dto.ArticleDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 게시글 전체 조회
    public List<ArticleDto> getArticleList() {
       return articleDao.findAllArticle();
    }
    //게시글 1개 조회 - 게시글 ID로
    public ArticleDto getArticle(int id){
        return articleDao.findById(id);
    }
    //게시글 1개 조회 - 게시글 ID, 작성자(memberId) - 조회시 articleDto 반환, 없을 시 null 반환
    public ArticleDto getArticle(String memberId, int id){

        if(articleDao.findById(id).getMemberId().equals(memberId)){
            return articleDao.findById(id);
        }
        // 로그인된 memberId와 게시글 작성자 memberId 일치 하지 않을 경우, 예외처리 추가
        return null;
    }

    // 게시글 1개 삭제 - 게시글 작성자와 session 로그인 아이디와 일치시 삭제 - 로직 고도화 필요
    @Transactional
    public void deleteArticle(String memberID, int id) {
        if(articleDao.findById(id).getMemberId().equals(memberID)){
            articleDao.deleteById(id);
        }
        // 로그인된 memberId와 게시글 작성자 memberId 일치 하지 않을 경우, 예외처리 추가

    }

    public int saveArticle(ArticleDto article) {
        articleDao.save(article);
        return articleDao.returningId();
    }

    public void updateArticle(ArticleDto article) {
        articleDao.update(article);

    }
}
