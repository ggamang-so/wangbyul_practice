package egovframework.example.controller;

import egovframework.example.Const.Category;
import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.CategoryDto;
import egovframework.example.dto.DailyArticleDto;
import egovframework.example.dto.MemberArticleDto;
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
        List<ArticleDto> list = articleService.getArticleList(pageVo);
        int total = articleService.getTotalArticleCount(pageVo);
        Map<String, Object> result = new HashMap<>();
        result.put("data", list);
        result.put("total", total);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ArticleDto> saveArticle(@RequestBody ArticleDto articleDto) {
        ArticleDto savedArticle = articleService.saveArticle(articleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    // 게시글 1개 조회
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticle(@PathVariable("id") int id) {
        ArticleDto article = articleService.getArticle(id);
        return ResponseEntity.ok(article);
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateArticle(@RequestBody ArticleDto articleDto, @RequestHeader("Authorization") String tokenWithBearer) {
        articleService.updateArticle(articleDto);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "게시글이 수정되었습니다.");
        return ResponseEntity.ok(map);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable("id") int id, @RequestHeader("Authorization") String tokenWithBearer) {
        System.out.println(id);
        String token = tokenWithBearer.replace("Bearer ", "");
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

    @GetMapping("/category/count")
    public ResponseEntity<List<CategoryDto>> getCategoryCount(@Nullable @RequestHeader("Authorization") String token) {
        List<CategoryDto> categoryCounts = articleService.getCountArticleCategory().stream()
                .map(CategoryDto::of).toList();
        return ResponseEntity.ok(categoryCounts);
    }

    @GetMapping("/member/count")
    public ResponseEntity<List<MemberArticleDto>> getMemberArticleCount(@Nullable @RequestHeader("Authorization") String token) {
        List<MemberArticleDto> memberArticleDto = articleService.getArticleCountPerMemberId();
        return ResponseEntity.ok(memberArticleDto);
    }

    @GetMapping("/daily/count")
    public ResponseEntity<List<DailyArticleDto>> getDailyArticleCount(@Nullable @RequestHeader("Authorization") String token) {
        List<DailyArticleDto> dailyArticleDto = articleService.getArticleCountDaily();
        return ResponseEntity.ok(dailyArticleDto);
    }

}
