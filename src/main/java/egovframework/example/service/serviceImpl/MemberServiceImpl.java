package egovframework.example.service.serviceImpl;

import egovframework.example.dao.MemberDao;
import egovframework.example.dto.MemberDto;
import egovframework.example.service.JwtService;
import egovframework.example.service.MemberService;
import egovframework.example.util.PasswordUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;


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
    private final RedisTemplate<String, String> redisTemplate;


    public MemberServiceImpl(MemberDao memberDao, JwtService jwtService, RedisTemplate<String, String> redisTemplate) {
        this.memberDao = memberDao;
        this.jwtService = jwtService;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void signUpMember(MemberDto memberDto) throws Exception {
        MemberDto member = memberDao.findById(memberDto.getMemberId());
        if (member != null) {
            throw new Exception("이미 존재하는 회원입니다. 다른 계정으로 변경해주세요");
        }
        String hashedPassword = PasswordUtil.hashPassword(memberDto.getMemberPw());
        memberDto.setMemberPw(hashedPassword);
        memberDao.save(memberDto);

    }

    @Override
    public Map<String, String> loginMember(String memberId, String memberPw) {
        Map<String, String> map = new HashMap<String, String>();
        MemberDto memberDto = memberDao.findById(memberId);
        if (memberDto != null && PasswordUtil.verifyPassword(memberPw, memberDto.getMemberPw())){
            String accessToken = jwtService.generateAccessToken(memberDto.getMemberId());
            String refreshToken = jwtService.generateRefreshToken(memberDto.getMemberId());
            map.put("accessToken", accessToken);
            map.put("refreshToken", refreshToken);
            redisTemplate.opsForValue().set(memberId,refreshToken, 7, TimeUnit.DAYS);
            return map;

        } else{
            throw new RuntimeException("Invalid username or password");
        }
    }


}
