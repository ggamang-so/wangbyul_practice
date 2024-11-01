package egovframework.example.controller;

import egovframework.example.dto.MemberDto;
import egovframework.example.service.JwtService;
import egovframework.example.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
public class MemberApiController {

    private final MemberService memberService;
    private final JwtService jwtService;

    public MemberApiController(MemberService memberService, JwtService jwtService) {
        this.memberService = memberService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody MemberDto memberDto) {
        System.out.println(memberDto);
        Map<String, Object> map = new HashMap<>();
        try {
            memberService.signUpMember(memberDto);
            map.put("message", "회원가입에 성공했습니다. 로그인을 진행해주세요");
            return ResponseEntity.ok(map);
        }catch(Exception e){
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(map);
        }



    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto memberDto,
                                                     @RequestAttribute("isLoggedIn") boolean isLoggedIn,
                                                     HttpServletResponse response){
        Map<String, Object> responseMap = new HashMap<>();
        System.out.println("/login 내 isLoggedIn : " + isLoggedIn );

        if (!isLoggedIn) { //  미 로그인시
            try {
                Map<String, String> map = memberService.loginMember(memberDto.getMemberId(), memberDto.getMemberPw());


                String accessToken = map.get("accessToken");
                String refreshToken = map.get("refreshToken");

                responseMap.put("memberId", memberDto.getMemberId());
                responseMap.put("refreshToken", refreshToken);

                Cookie cookie = new Cookie("accessToken", accessToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath("/");
                cookie.setMaxAge(15 * 60);

                response.addCookie(cookie);
                responseMap.put("isLoggedIn", true);
                return ResponseEntity.ok(responseMap);
            }catch(RuntimeException e) {
                System.out.println("로그인실패");
                responseMap.put("message", e.getMessage());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
            }
        }
        responseMap.put("message", "이미 로그인 되어있습니다. 로그아웃하고 다시 진행해주세요.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMap);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String loginId = request.getHeader("loginId"); // TO-DO :loginId가 null일때 처리
        jwtService.deleteRefreshToken(loginId);
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        response.addCookie(cookie); // 쿠키 추가
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }
}
