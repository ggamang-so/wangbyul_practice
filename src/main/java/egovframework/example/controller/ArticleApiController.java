package egovframework.example.controller;

import egovframework.example.Const.Category;
import egovframework.example.dto.ArticleDto;
import egovframework.example.service.ArticleService;
import egovframework.example.service.JwtService;
import egovframework.example.service.serviceImpl.JwtServiceImpl;
import egovframework.example.vo.PageVo;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/article/")
public class ArticleApiController {

    private final ArticleService articleService;
    private final JwtService jwtService;

    public ArticleApiController(ArticleService articleService, JwtService jwtService) {
        this.articleService = articleService;
        this.jwtService = jwtService;
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
    public ResponseEntity<ArticleDto> saveArticle(@RequestBody ArticleDto articleDto) {
        System.out.println("Article create : "+articleDto.toString());
        ArticleDto savedArticle = articleService.saveArticle(articleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    // 게시글 1개 조회
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticle(@PathVariable("id") int id, @RequestHeader("Authorization") String tokenWithBearer) {
        ArticleDto article = articleService.getArticle(id);
        return ResponseEntity.ok(article);
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateArticle(@RequestBody ArticleDto articleDto, @RequestHeader("Authorization") String tokenWithBearer) {
        System.out.println("received Article(update) : " + articleDto.toString());
        articleService.updateArticle(articleDto);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "게시글이 수정되었습니다.");
        return ResponseEntity.ok(map);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable("id") int id, @RequestHeader("Authorization") String tokenWithBearer) {
        String token = tokenWithBearer.replace("Bearer ", "");
        System.out.println(token);
        if(!jwtService.validateToken(token, articleService.getArticle(id).getMemberId())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근권한이 없습니다. 로그인을 확인해주세요.");
        }
            articleService.deleteArticle(id);
            return ResponseEntity.ok("삭제가 완료되었습니다.");
    }
    @GetMapping("/category")
    public ResponseEntity< List<Map<String, ? extends Serializable>>> getCategory(@Nullable @RequestHeader("Authorization") String token) {
            List<Map<String, ? extends Serializable>> categoryList =
                    Arrays.stream(Category.values())
                            .map(category -> Map.of("name", category.getDisplayName(), "value", category.getValue()))
                            .collect(Collectors.toList());
        return ResponseEntity.ok(categoryList);

    }

}
