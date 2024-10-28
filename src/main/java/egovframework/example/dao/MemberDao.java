package egovframework.example.dao;

import egovframework.example.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDao {

    MemberDto findByIdAndPassword(String memberId, String memberPw);
    MemberDto findById(String memberId);
    void save(MemberDto memberDto);
}
