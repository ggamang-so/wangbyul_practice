package egovframework.example.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


/**
 * @author : com
 * @packageName : egovframework.example.controller
 * @fileName : MemberController
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        com       최초 생성
 * </pre>
 */
@Controller
@RequiredArgsConstructor
public class MemberController {

    @GetMapping("/signup")
    public String signup(@RequestAttribute("isLoggedIn") boolean isLoggedIn) {
        return "member/signup";
    }

    @GetMapping("/login")
    public String loginForm(@RequestAttribute("isLoggedIn") boolean isLoggedIn, RedirectAttributes redirectAttributes) {
        if(!isLoggedIn) {
            return "member/login";
        }
        redirectAttributes.addFlashAttribute("errorMessage","이미 로그인 되어있습니다. 새로운 로그인을 원하시면 로그아웃 후 진행해주세요.");
        redirectAttributes.addFlashAttribute("isLoggedIn", true);
        return "redirect:/";
    }

}
