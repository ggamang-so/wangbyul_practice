package egovframework.example.dao;

import egovframework.example.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDao {

    MemberDto findById(String memberId, String memberPassword);
}
