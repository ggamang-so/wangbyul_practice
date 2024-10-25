package egovframework.example.controller;

import egovframework.example.config.SessionConst;
import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.MemberDto;
import egovframework.example.service.ArticleService;
import egovframework.example.service.JwtService;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

    private final ArticleService articleService;
    private final JwtService jwtService;

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


}
