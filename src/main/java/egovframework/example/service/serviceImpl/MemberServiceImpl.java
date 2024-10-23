package egovframework.example.service.serviceImpl;

import egovframework.example.dao.MemberDao;
import egovframework.example.dto.MemberDto;
import egovframework.example.service.JwtService;
import egovframework.example.service.MemberService;
import egovframework.example.util.PasswordUtil;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


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

@Service
@Transactional
public class MemberServiceImpl implements MemberService {


    private final MemberDao memberDao;
    private final JwtService jwtService;


    public MemberServiceImpl(MemberDao memberDao, JwtService jwtService) {
        this.memberDao = memberDao;
        this.jwtService = jwtService;
    }

    @Override
    public void signUpMember(MemberDto memberDto) throws Exception {
        MemberDto member = memberDao.findById(memberDto.getMemberId());
        if (member != null) {
            throw new Exception("이미 존재하는 회원입니다. 다른 계정으로 변경해주세요");
        }
        String hashedPassword = PasswordUtil.hashPassword(memberDto.getMemberPassword());
        memberDto.setMemberPassword(hashedPassword);
        memberDao.save(memberDto);

    }

    @Override
    public String loginMember(String memberId, String memberPassword) {
        MemberDto memberDto = memberDao.findById(memberId);
        if (memberDto != null && PasswordUtil.verifyPassword(memberPassword, memberDto.getMemberPassword())){
            return jwtService.generateToken(memberId); // 로그인 성공시 jwt 토큰 반환
        } else{
            throw new RuntimeException("Invalid username or password");
        }
    }


}
