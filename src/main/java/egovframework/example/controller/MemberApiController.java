package egovframework.example.controller;

import egovframework.example.dto.MemberDto;
import egovframework.example.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
public class MemberApiController {

    private final MemberService memberService;

    public MemberApiController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@ModelAttribute MemberDto memberDto) throws Exception {
            memberService.signUpMember(memberDto);
            return ResponseEntity.ok("회원가입에 성공하였습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@ModelAttribute MemberDto memberDto) {
        System.out.println(memberDto.toString());
        String token = memberService.loginMember(memberDto.getMemberId(), memberDto.getMemberPassword());
        Map<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("memberId", memberDto.getMemberId());
        return ResponseEntity.ok(map);
    }
}
