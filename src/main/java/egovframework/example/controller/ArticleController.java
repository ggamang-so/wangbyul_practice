package egovframework.example.controller;

import egovframework.example.dto.ArticleDto;
import egovframework.example.service.ArticleService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/")
    public String articles(HttpSession session, ModelMap map) {
        if (session.getAttribute("loginStatus") != null) {
            map.addAttribute("loginStatus", session.getAttribute("loginStatus"));
            map.addAttribute("loginId", session.getAttribute("loginId"));
        }
        return "articles/index";
    }

    // 게시글 전체 조회
    @PostMapping("/articles")
    @ResponseBody
    public Map<String, Object> getArticles() {
        List<ArticleDto> list = articleService.getArticleList();
        int total = list.size();
        System.out.println(list.toString());

        Map<String, Object> result = new HashMap<>();
        result.put("value", list);
        result.put("@odata.count", total);
        return result;
    }

    //게시글 작성
    @GetMapping("/article/create")
    public String createArticle(HttpSession session, ModelMap map) {
        map.addAttribute("loginId", session.getAttribute("loginId"));
        return "articles/article_write";
    }

    @PostMapping("/article/writeOk")
    public String saveArticle(ArticleDto article, HttpSession session) {
        System.out.println(article);
        int id = articleService.saveArticle(article);
        return "redirect:/article/"+id;
    }

    // 게시글 1개 조회
    @GetMapping("/article/{id}")
    public ModelAndView getArticle(@PathVariable("id") int id, HttpSession session ) {
        ModelAndView mav = new ModelAndView();
        ArticleDto article = articleService.getArticle(id);
        mav.addObject("article", article);
        mav.addObject("loginId", session.getAttribute("loginId"));
        mav.setViewName("articles/article_detail");
        return mav;
    }



    // 게시글 수정
    @GetMapping("/article/update/{id}")
    public ModelAndView editArticle(@PathVariable("id") int id, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        ArticleDto article = articleService.getArticle((String) session.getAttribute(("loginId")), id);
        mav.addObject("article", article);
        mav.setViewName("articles/article_editor");
        return mav;
    }

    @PostMapping("/article/updateOk")
    public String updateArticle(ArticleDto article) {
        articleService.updateArticle(article);
        return "redirect:/article/"+article.getId();
    }

    //게시글 삭제
    @GetMapping("/article/delete/{id}")
    public String deleteArticle(@PathVariable("id") int id, HttpSession session) {
        articleService.deleteArticle((String) session.getAttribute("loginId"), id);
       return "redirect:/";
    }




}
