package egovframework.example.service;

import egovframework.example.dto.MemberDto;


/**
 * @author : com
 * @packageName : egovframework.example.service
 * @fileName : MemberService
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        com       최초 생성
 * </pre>
 */

public interface MemberService {

    public void signUpMember(MemberDto memberDto) throws Exception;
    public String loginMember(String memberId, String memberPw);
}
