package egovframework.example.service;

import egovframework.example.dao.MemberDao;
import egovframework.example.dto.MemberDto;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
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
public class MemberService {


    private final MemberDao memberDao;


    public MemberService(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public MemberDto getMemberById(String memberId, String memberPassword){
        return memberDao.findById(memberId, memberPassword);
    }


}
