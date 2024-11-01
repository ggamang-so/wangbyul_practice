package egovframework.example.service.serviceImpl;

import egovframework.example.Const.Category;
import egovframework.example.dao.ArticleDao;
import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.CategoryDto;
import egovframework.example.dto.DailyArticleDto;
import egovframework.example.dto.MemberArticleDto;
import egovframework.example.service.ArticleService;
import egovframework.example.vo.PageVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

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
public class ArticleServiceImpl implements ArticleService {

    private final ArticleDao articleDao;

    public ArticleServiceImpl(ArticleDao articleDao) {
        this.articleDao = articleDao;
    }

    // 게시글 전체 조회
    public List<ArticleDto> getArticleList(PageVo pageVo) throws Exception {

        if(pageVo.getSearchField().equals("category")){
            System.out.println("111");
            pageVo.setSearchValue(Category.getValue(pageVo.getSearchValue()));
        }
        List<ArticleDto> list = articleDao.findAllArticle(pageVo);
        for(ArticleDto articleDto : list){
            articleDto.setCategory(Category.getDisplayName(articleDto.getCategoryValue()));
        }
       return list;
    }


    //게시글 1개 조회 - 게시글 ID로
    public ArticleDto getArticle(int id){
        ArticleDto articleDto = articleDao.findById(id);
        articleDto.setCategory(Category.getDisplayName(articleDto.getCategoryValue()));
        return articleDto;
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
    public void deleteArticle(int id) {
            articleDao.deleteById(id);
    }
    //게시글 등록
    public ArticleDto saveArticle(ArticleDto article) {
        String content = article.getContent();
        article.setContent(content);
        articleDao.save(article);
        return articleDao.findById(articleDao.returningId());
    }
    //게시글 수정
    public void updateArticle(ArticleDto articleDto) {
        articleDao.update(articleDto);
    }
    // 게시글 총 갯수
    public int getTotalArticleCount(PageVo pageVo) {
        return articleDao.totalArticleCount(pageVo);
    }

    @Override
    public List<CategoryDto> getCountArticleCategory() {
        return articleDao.articleCountPerCategory();
    }

    @Override
    public List<MemberArticleDto> getArticleCountPerMemberId() {
        return articleDao.articleCountPerMemberId();
    }

    @Override
    public List<DailyArticleDto> getArticleCountDaily() {
        return articleDao.articleCountDaily();
    }
}

