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
    public  ResponseEntity<Map<String, Object>> signup(@RequestBody MemberDto memberDto) throws Exception {
        System.out.println(memberDto.toString());
        memberService.signUpMember(memberDto);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "회원가입에 성공했습니다. 로그인을 진행해주세요");
        return ResponseEntity.ok(map);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto memberDto) throws Exception {
        System.out.println(memberDto.toString());
        String token = memberService.loginMember(memberDto.getMemberId(), memberDto.getMemberPw());
        Map<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("memberId", memberDto.getMemberId());
        return ResponseEntity.ok(map);
    }
}
