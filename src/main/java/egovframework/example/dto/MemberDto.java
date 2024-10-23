package egovframework.example.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

/**
 * @author : com
 * @packageName : egovframework.example.dto
 * @fileName : MemberDto
 * @date : 24. 10. 14.
 * @description :
 * <pre>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 24. 10. 14.        com       최초 생성
 * </pre>
 */

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class MemberDto {
    private String memberId;
    private String memberPassword;
    private String name;
    private String email;
    private String nickname;
    private LocalDateTime createdAt;

}
