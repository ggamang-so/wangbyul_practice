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
    public String articles(ModelMap map) {
        return "articles/index";
    }

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

    @GetMapping("/articles/create")
    public String createArticle(HttpSession session) {
        if(session.getAttribute("loginStatus").equals("Y")||session.getAttribute("loginStatus")!=null){
            return "articles/article_editor";
        } else {
            return "member/login";
        }
    }


    @GetMapping("/article/{id}")
    public ModelAndView getArticle(@PathVariable("id") long id) {
        ModelAndView mav = new ModelAndView();
        ArticleDto article = articleService.getArticle(id);
        mav.addObject("article", article);
        mav.setViewName("articles/article_detail");
        return mav;
    }
}
