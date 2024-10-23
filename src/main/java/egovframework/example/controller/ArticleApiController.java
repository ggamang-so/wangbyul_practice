package egovframework.example.controller;

import egovframework.example.config.SessionConst;
import egovframework.example.dto.ArticleDto;
import egovframework.example.service.ArticleService;
import egovframework.example.vo.PageVo;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/article/")
public class ArticleApiController {

    private final ArticleService articleService;

    public ArticleApiController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // 게시글 전체 조회
    @PostMapping("/list")
    public ResponseEntity<Map<String, Object>> getArticles(@RequestBody PageVo pageVo) throws Exception {
        System.out.println(pageVo.toString());
        int page = pageVo.getPage();
        int pageSize = pageVo.getPageSize();

        List<ArticleDto> list = articleService.getArticleList(page, pageSize);
        int total = articleService.getTotalArticleCount();
        System.out.println(list.toString());

        Map<String, Object> result = new HashMap<>();
        result.put("data", list);
        result.put("total", total);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ArticleDto> saveArticle(ArticleDto articleDto) {
        ArticleDto savedArticle = articleService.saveArticle(articleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    // 게시글 1개 조회
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticle(@PathVariable("id") int id, @RequestHeader("Authorization") String token ) {
        ArticleDto article = articleService.getArticle(id);
//        mav.addObject("member", session.getAttribute(SessionConst.LOGIN_MEMBER));
//        mav.setViewName("articles/article_detail");
        return ResponseEntity.ok(article);
    }



}
