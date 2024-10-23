package egovframework.example.controller;

import egovframework.example.config.SessionConst;
import egovframework.example.dto.ArticleDto;
import egovframework.example.dto.MemberDto;
import egovframework.example.service.ArticleService;
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

    //게시글 목록 페이지
    @GetMapping("/")
    public String home(HttpServletRequest request, ModelMap map) {
        HttpSession session = request.getSession(false);

        if (session == null) {
            return "articles/article_list";
        }
        MemberDto dto = (MemberDto) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if (dto == null) {
            session.invalidate();
            return "articles/article_list";
        }
        map.addAttribute("member", dto);
        System.out.println(map.getAttribute("member"));
        return "articles/article_list";
    }

    //게시글 작성 페이지
    @GetMapping("/article/create")
    public String createArticle(HttpServletRequest request, ModelMap map, RedirectAttributes redirectAttributes) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            redirectAttributes.addFlashAttribute("errorMessage", "로그인을 해야 글을 쓸 수 있습니다.");
            return "articles/article_list";
        }
        map.addAttribute("member", session.getAttribute(SessionConst.LOGIN_MEMBER));
        return "articles/article_write";
    }


    // 게시글 수정
    @GetMapping("/article/update/{id}")
    public ModelAndView editArticle(@PathVariable("id") int id, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        try {
            ArticleDto article = articleService.getArticle(((MemberDto) session.getAttribute(SessionConst.LOGIN_MEMBER)).getMemberId(), id);
            mav.addObject("article", article);
            mav.setViewName("articles/article_editor");
        } catch (NullPointerException e) {
            mav.addObject("errorMessage", "잘못된 접근입니다. 계정 정보를 확인해 주세요.");
            mav.setViewName("redirect:/article/" + id);
        }
        return mav;
    }

    @PostMapping("/article/updateOk")
    @ResponseBody
    public String updateArticle(@RequestBody ArticleDto article) {
        System.out.println(article.toString());
        articleService.updateArticle(article);
        return "redirect:/article/" + article.getId();
    }

    //게시글 삭제
    @GetMapping("/article/delete/{id}")
    public String deleteArticle(@PathVariable("id") int id, HttpSession session) {
        MemberDto dto = (MemberDto) session.getAttribute(SessionConst.LOGIN_MEMBER);
        articleService.deleteArticle(dto.getMemberId(), id);
        return "redirect:/";
    }


}
