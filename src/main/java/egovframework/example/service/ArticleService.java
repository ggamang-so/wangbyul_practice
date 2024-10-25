package egovframework.example.service;

import egovframework.example.dto.ArticleDto;

import java.util.List;

public interface ArticleService {


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

// 게시글 전체 조회
        public List<ArticleDto> getArticleList(int page, int pageSize) throws Exception;


    //게시글 1개 조회 - 게시글 ID로
    public ArticleDto getArticle(int id);
    //게시글 1개 조회 - 게시글 ID, 작성자(memberId) - 조회시 articleDto 반환, 없을 시 null 반환
    public ArticleDto getArticle(String memberId, int id);

    // 게시글 1개 삭제 - 게시글 작성자와 session 로그인 아이디와 일치시 삭제 - 로직 고도화 필요
    public void deleteArticle(int id) ;

    //게시글 등록
    public ArticleDto saveArticle(ArticleDto article);
    //게시글 수정
    public void updateArticle(ArticleDto article);
    // 게시글 삭제
    public int getTotalArticleCount() ;
}

