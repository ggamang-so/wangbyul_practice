package egovframework.example.controller;

import egovframework.example.dto.MemberDto;
import egovframework.example.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
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
public class MemberController {

    final MemberService memberService;


    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/signup")
    public String signup() {
        return "member/signup";
    }

    @GetMapping("/login")
    public String login(HttpSession session) {
        if(session.getAttribute("loginStatus")=="Y" && session.getAttribute("loginStatus")!=null){
            return "redirect:/";
        }
        return "member/login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.setAttribute("loginStatus", "N");
        session.removeAttribute("loginId");
        return "redirect:/";
    }

    @PostMapping("/loginOk")
    public String loginOk(String memberId, String memberPassword, HttpSession session, RedirectAttributes redirectAttributes) {
        MemberDto dto = memberService.getMemberById(memberId, memberPassword);
        if(dto!=null) {
            session.setAttribute("loginId", memberId);
            session.setAttribute("loginStatus", "Y");
            System.out.println(session.getAttribute("loginId"));
            System.out.println(session.getAttribute("loginStatus"));
        }
        if(dto==null){
            redirectAttributes.addFlashAttribute("errorMessage", "회원 정보를 찾을 수 없습니다.");
            return "redirect:/login";

        }
        return "redirect:/";
    }

    @PostMapping("/register")
    public String register(MemberDto memberDto) {
        return "artcles/index";
    }
}
