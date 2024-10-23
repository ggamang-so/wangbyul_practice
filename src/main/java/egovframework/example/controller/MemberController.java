package egovframework.example.controller;

import egovframework.example.config.SessionConst;
import egovframework.example.dto.MemberDto;
import egovframework.example.service.JwtService;
import egovframework.example.service.MemberService;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.sql.SQLException;


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
public class MemberController {

    private final MemberService memberService;
    private final JwtService jwtService;


    public MemberController(MemberService memberService, JwtService jwtService) {
        this.memberService = memberService;
        this.jwtService = jwtService;
    }

    @GetMapping("/signup")
    public String signup() {
        return "member/signup";
    }



    @GetMapping("/login")
    public String loginForm(@Nullable  @RequestHeader("Authorization") String token, RedirectAttributes redirectAttributes) {
        if(token == null || jwtService.isTokenExpired(token)) {
            return "member/login";
        }
        redirectAttributes.addFlashAttribute("errorMessage","이미 로그인 되어있습니다. 새로운 로그인을 원하시면 로그아웃 후 진행해주세요.");
        return "redirect:/";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/";
    }

}
