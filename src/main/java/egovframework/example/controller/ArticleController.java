package egovframework.example.controller;

import egovframework.example.service.ArticleService;
import egovframework.example.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * @author : ggamangso
 * @packageName : egovframework.example.controller
 * @fileName : ArticleController
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        ggamangso       최초 생성
 * </pre>
 */

@RequiredArgsConstructor
@Controller
public class ArticleController {

    //게시글 목록 페이지
    @GetMapping("/")
    public String home() {
        return "articles/article_list";
    }

    //게시글 작성 페이지
    @GetMapping("/article/create")
    public String createArticle(){
        return "articles/article_write";
    }
    //게시글 조회 폼
    @GetMapping("/article/{id}")
    public String getArticle(@PathVariable("id") int id, ModelMap map){
        map.addAttribute("id", id);
        return "articles/article_detail";
    }

    // 게시글 수정
    @GetMapping("/article/update/{id}")
    public String editArticle(@PathVariable("id") int id,ModelMap map){
        map.addAttribute("id", id);
        return "articles/article_editor";
    }

    //게시글 데쉬보드 페이지
    @GetMapping("/article/dashboard")
    public String dashboard() {
        return "articles/article_dashboard";
    }

}
